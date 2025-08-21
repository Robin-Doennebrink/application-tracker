import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationEntry {
  id: number;
  company: string;
  application_date: string;
  job_title: string;
  job_posting: string | null;
  status: string;
  max_stage: string;
  last_update: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private base = 'http://localhost:8000'; // or env
  constructor(private http: HttpClient) {}

  list(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/api/applications/`);
  }
}
