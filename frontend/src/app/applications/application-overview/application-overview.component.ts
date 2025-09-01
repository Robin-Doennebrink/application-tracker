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
    'jobPosting',
    'status',
    'maxStage',
    'applicationDate',
    'lastUpdate'
  ];
  filterValues: { [key: string]: string } = {};


  constructor(private api: ApplicationsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.list().subscribe({
      next: (data: ApplicationEntry[]) => {
        this.dataSource.data = data;
        this.entries = data;

        this.dataSource.filterPredicate = (row: ApplicationEntry, filter: string): boolean => {
          const filterObj: Record<string, string> = filter ? JSON.parse(filter) : {};

          const fieldMap: Record<string, keyof ApplicationEntry> = {
            company: 'company',
            job_title: 'job_title',
            jobPosting: 'job_posting',
            job_posting: 'job_posting',
            status: 'status',
            maxStage: 'max_stage',
            max_stage: 'max_stage',
            applicationDate: 'application_date',
            application_date: 'application_date',
            lastUpdate: 'last_update',
            last_update: 'last_update',
          };

          return Object.keys(filterObj).every(col => {
            const raw = filterObj[col];
            if (!raw) return true;

            const key = fieldMap[col] ?? (col as keyof ApplicationEntry);
            const cell = (row as any)[key];

            const cellText = cell != null ? String(cell).toLowerCase() : '';
            const filterText = String(raw).toLowerCase();
            return cellText.includes(filterText);
          });
        };


        this.dataSource.sortingDataAccessor = (item: ApplicationEntry, columnId: string): string | number => {
          switch (columnId) {
            case 'jobPosting':
              return item.job_posting?.toLowerCase() ?? '';
            case 'applicationDate':
              return new Date(item.application_date as any).getTime() || 0;
            case 'lastUpdate':
              return new Date(item.last_update as any).getTime() || 0;
            case 'status':
              return (this.statusLabels[item.status] ?? item.status ?? '').toLowerCase();
            case 'maxStage':
              const idx = this.stageValues.indexOf(item.max_stage as any);
              return idx >= 0 ? idx : Number.POSITIVE_INFINITY;
            case 'company':
              return item.company?.toLowerCase() ?? '';
            case 'job_title':
              return item.job_title?.toLowerCase() ?? '';
            default:
              return (item as any)[columnId]?.toString().toLowerCase() ?? '';
          }
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
    this.api.patchApplication(entry.id, {"status": newStatus}).subscribe({
      next: updated => {
        entry.max_stage = updated.max_stage;
      },
      error: err => console.error('Update failed', err)
    });
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
