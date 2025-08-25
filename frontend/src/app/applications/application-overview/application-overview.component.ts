import {Component, OnInit} from '@angular/core';
import {ApplicationEntry} from "../../models/application-entry.model";
import {ApplicationsService} from "../../services/application.service";
import {CommonModule} from "@angular/common";
import {AddApplicationDialogComponent} from "../add-application-dialog/add-application-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-application-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-overview.component.html',
  styleUrl: './application-overview.component.scss'
})
export class ApplicationOverviewComponent implements OnInit {
  entries: ApplicationEntry[] = [];
  loading = true;
  error: string | null = null;

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

}
