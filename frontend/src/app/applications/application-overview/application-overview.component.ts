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
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-application-overview',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule],
  templateUrl: './application-overview.component.html',
  styleUrl: './application-overview.component.scss'
})
export class ApplicationOverviewComponent implements OnInit {
  entries: ApplicationEntry[] = [];
  loading = true;
  error: string | null = null;
  statusLabels = StatusLabels;
  statusValues = StatusValues;
  stageValues = StageValues;
  stageLabels = StageLabels;

  displayedColumns: string[] = [
    'company',
    'jobTitle',
    'jobPosting',
    'status',
    'maxStage',
    'applicationDate',
    'lastUpdate'
  ];


  constructor(private api: ApplicationsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.list().subscribe({
      next: (data: ApplicationEntry[]) => { this.entries = data; this.loading = false; },
      error: (err: any) => { this.error = 'Failed to load entries'; this.loading = false; console.error(err); }
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
        console.log('New application:', result);
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


}
