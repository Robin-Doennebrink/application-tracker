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