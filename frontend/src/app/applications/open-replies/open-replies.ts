import {Component, OnInit} from '@angular/core';
import {ApplicationEntry} from "../../models/application-entry.model";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {ApplicationsService} from "../../services/application.service";
import {LocaleService} from "../../services/locale.service";

@Component({
  selector: 'app-open-replies',
  imports: [CommonModule, MatTableModule],
  templateUrl: './open-replies.html',
  styleUrl: './open-replies.scss'
})
export class OpenReplies implements OnInit{
  displayedColumns = ['company', 'job_title', 'expected_response_date'];
  data: ApplicationEntry[] = [];
  loading = true;
  error: string | null = null;

  constructor(private api: ApplicationsService, public localeService: LocaleService
  ) {}

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

  isPast(dateVal: unknown): boolean {
    if (!dateVal) return false;
    const d = typeof dateVal === 'string' || typeof dateVal === 'number' ? new Date(dateVal) : (dateVal as Date);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cmp = new Date(d);
    cmp.setHours(0, 0, 0, 0);
    return cmp.getTime() < today.getTime();
  }

}
