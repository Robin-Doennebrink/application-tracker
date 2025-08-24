import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApplicationEntry} from "../models/application-entry.model";

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private base = 'http://localhost:8000'; // or env
  constructor(private http: HttpClient) {}

  list(): Observable<ApplicationEntry[]> {
    return this.http.get<ApplicationEntry[]>(`${this.base}/api/applications/`);
  }
}
