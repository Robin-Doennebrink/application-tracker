import {Status} from "./status.enum";
import {Stage} from "./stage.enum";

export interface ApplicationEntry {
  id: number;
  company: string;
  application_date: string;
  job_title: string;
  job_posting: string | null;
  status: Status;
  max_stage: Stage;
  last_update: string;
  expected_response_date: string | null;
}

export interface StatusCount {
  status: Status;
  count: number;
}

export interface StageCount {
  max_stage: Stage;
  count: number;
}

export interface AggregatedApplicationData {
  status_counts: StatusCount[];
  max_stage_counts: StageCount[];
  total: number;
}