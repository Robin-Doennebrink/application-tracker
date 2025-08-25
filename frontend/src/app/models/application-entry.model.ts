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
}