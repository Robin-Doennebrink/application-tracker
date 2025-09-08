import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationEntry, AggregatedApplicationData } from '../models/application-entry.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {  }

  list(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/applications/`);
  }

  addApplication(applicationData: any): Observable<ApplicationEntry> {
    return this.http.post<ApplicationEntry>(`${this.base}/applications/`, applicationData);
  }

  patchApplication(
      id: number,
      changes: Partial<ApplicationEntry>
  ): Observable<ApplicationEntry> {
    return this.http.patch<ApplicationEntry>(`${this.base}/applications/${id}/`, changes);
  }

  listInterviews(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/application/interviews/`);
  }

  aggregateInterviews(): Observable<AggregatedApplicationData> {
    return this.http.get<AggregatedApplicationData>(`${this.base}/application/aggregates/`);
  }
}
