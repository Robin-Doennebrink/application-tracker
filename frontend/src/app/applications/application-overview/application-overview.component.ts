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

@Component({
  selector: 'app-application-overview',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule ],
  templateUrl: './application-overview.component.html',
  styleUrls: ['./application-overview.component.scss']
})
export class ApplicationOverviewComponent implements OnInit {
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

        // Custom filter predicate for column-wise filtering
        this.dataSource.filterPredicate = (data: ApplicationEntry, filter: string): boolean => {
          const filterObj = JSON.parse(filter);
          return Object.keys(filterObj).every(column => {
            const filterValue = filterObj[column];
            if (!filterValue) {
              return true; // no filter for this column
            }
            const cellValue = (data as any)[column];
            return cellValue?.toString().toLowerCase().includes(filterValue);
          });
        };

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load entries';
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




}
