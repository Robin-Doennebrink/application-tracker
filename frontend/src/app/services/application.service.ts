import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AggregatedApplicationData, ApplicationEntry} from "../models/application-entry.model";

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private base = 'http://localhost:8000'; // or env
  constructor(private http: HttpClient) {}

  list(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/api/applications/`);
  }

  addApplication(applicationData: any): Observable<ApplicationEntry> {
      return this.http.post<ApplicationEntry>(`${this.base}/api/applications/`, applicationData)
  }

  patchApplication(
      id: number,
      changes: Partial<ApplicationEntry>
  ): Observable<ApplicationEntry> {
    return this.http.patch<ApplicationEntry>(`${this.base}/api/applications/${id}/`, changes);
  }

  listInterviews(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/api/application/interviews/`);
  }

  aggregateInterviews(): Observable<AggregatedApplicationData[]> {
    return this.http.get<AggregatedApplicationData[]>(`${this.base}/api/application/aggregates/`);
  }

}
