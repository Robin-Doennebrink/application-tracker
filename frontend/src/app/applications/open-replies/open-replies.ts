import { Component } from '@angular/core';
import {ApplicationEntry} from "../../models/application-entry.model";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {ApplicationsService} from "../../services/application.service";

@Component({
  selector: 'app-open-replies',
  imports: [CommonModule, MatTableModule],
  templateUrl: './open-replies.html',
  styleUrl: './open-replies.scss'
})
export class OpenReplies {
  displayedColumns = ['company', 'job_title', 'expected_response_date'];
  data: ApplicationEntry[] = [];
  loading = true;
  error: string | null = null;

  constructor(private api: ApplicationsService) {}

  ngOnInit(): void {
    this.api.listInterviews().subscribe({
      next: entries => {
        this.data = entries ?? [];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load interview entries';
        this.loading = false;
      }
    });
  }


}
