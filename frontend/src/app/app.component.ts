import { Component, OnInit } from '@angular/core';
import { ApplicationsService, ApplicationEntry } from './application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
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
