import { Component } from '@angular/core';
import {ApplicationEntry} from "../../models/application-entry.model";
import {ApplicationsService} from "../../services/application.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-application-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-overview.component.html',
  styleUrl: './application-overview.component.scss'
})
export class ApplicationOverviewComponent {
  title = 'Applications';
  entries: ApplicationEntry[] = [];
  loading = true;
  error: string | null = null;

  constructor(private api: ApplicationsService) {}

  ngOnInit(): void {
    this.api.list().subscribe({
      next: (data: ApplicationEntry[]) => { this.entries = data; this.loading = false; },
      error: (err: any) => { this.error = 'Failed to load entries'; this.loading = false; console.error(err); }
    });
  }

}
