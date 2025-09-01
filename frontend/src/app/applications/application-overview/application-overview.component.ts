import {Component, OnInit} from '@angular/core';
import {ApplicationEntry} from "../../models/application-entry.model";
import {ApplicationsService} from "../../services/application.service";
import {CommonModule} from "@angular/common";
import {AddApplicationDialogComponent} from "../add-application-dialog/add-application-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Status, StatusLabels, StatusValues} from "../../models/status.enum";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { Stage, StageValues, StageLabels } from '../../models/stage.enum';
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import {
  SetExpectedResponseDialogComponent
} from "../set-expected-response-dialog/set-expected-response-dialog.component";


@Component({
  selector: 'app-application-overview',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './application-overview.component.html',
  styleUrls: ['./application-overview.component.scss']
})
export class ApplicationOverviewComponent implements OnInit, AfterViewInit {
  // Raw data array
  entries: ApplicationEntry[] = [];
  // MatTableDataSource for table features (sorting, filtering)
  dataSource = new MatTableDataSource<ApplicationEntry>();
  loading = true;
  error: string | null = null;
  statusLabels = StatusLabels;
  statusValues = StatusValues;
  stageValues = StageValues;
  stageLabels = StageLabels;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'company',
    'job_title',
    'job_posting',
    'status',
    'max_stage',
    'application_date',
    'last_update'
  ];
  filterValues: { [key: string]: string } = {};


  constructor(private api: ApplicationsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.list().subscribe({
      next: (data: ApplicationEntry[]) => {
        this.dataSource.data = data;
        this.entries = data;

        this.dataSource.filterPredicate = (row: ApplicationEntry, filter: string): boolean => {
          if (!filter) return true;

          let filterObj: Record<string, string>;
          try {
            filterObj = JSON.parse(filter);
          } catch {
            return true;
          }

          return Object.keys(filterObj).every(col => {
            const raw = filterObj[col];
            if (!raw) return true;

            const cell = (row as any)[col];
            const cellText = cell != null ? String(cell).toLowerCase() : '';
            const filterText = String(raw).toLowerCase();
            return cellText.includes(filterText);
          });
        };

        this.dataSource.sortingDataAccessor = (item: ApplicationEntry, columnId: string): string | number => {
          if (columnId === 'application_date' || columnId === 'last_update') {
            return new Date((item as any)[columnId]).getTime() || 0;
          }
          if (columnId === 'max_stage') {
            const idx = this.stageValues.indexOf(item.max_stage);
            return idx >= 0 ? idx : Number.POSITIVE_INFINITY;
          }
          const v = (item as any)[columnId];
          return v != null ? v.toString().toLowerCase() : '';
        };


        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load entries';
        console.error(err);
        this.loading = false;
      }
    });
  }


  addApplication(): void {
      const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '400px',
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.api.addApplication(result).subscribe({
          next: (newEntry) => {
            this.entries = [newEntry, ...this.entries];
          },
          error: (err) => {
            console.error('Failed to add application', err);
          }
        });
      }
    });
  }

  updateStatus(entry: ApplicationEntry, newStatus: Status) {
    const isInterview = newStatus.startsWith('interview');

    const patch = (payload: Partial<ApplicationEntry>) => {
      this.api.patchApplication(entry.id, payload).subscribe({
        next: updated => {
          entry.status = (updated as any)?.status ?? newStatus;
          if ('expected_response_date' in payload) {
            entry.expected_response_date = (updated as any)?.expected_response_date ?? payload.expected_response_date ?? null;
          }
          if ((updated as any)?.max_stage) {
            entry.max_stage = (updated as any).max_stage;
          }
        },
        error: err => console.error('Update failed', err)
      });
    };

    if (isInterview) {
      const dialogRef = this.dialog.open(SetExpectedResponseDialogComponent, {
        width: '360px',
        data: { company: entry.company, status: newStatus }
      });

      dialogRef.afterClosed().subscribe(result => {
        const expectedDate = result?.expected_response_date as string | undefined;
        const payload: Partial<ApplicationEntry> = expectedDate
            ? { status: newStatus, expected_response_date: expectedDate }
            : { status: newStatus };
        patch(payload);
      });
    } else {
      patch({ status: newStatus });
    }
  }


  onStageChange(entry: ApplicationEntry, newStage: Stage): void {
    this.api.patchApplication(entry.id, {"max_stage": newStage}).subscribe({
      next: updated => {
        entry.max_stage = updated.max_stage;
      },
      error: err => console.error('Update failed', err)
    });
  }

  getStageLabel(stage: string): string {
    return this.stageLabels[stage as Stage] ?? 'Unknown';
  }

  applyColumnFilter(column: string, value: string): void {
    this.filterValues[column] = value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }



}
