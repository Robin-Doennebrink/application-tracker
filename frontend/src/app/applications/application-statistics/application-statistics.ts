import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../services/application.service';
import { AggregatedApplicationData } from '../../models/application-entry.model';

@Component({
  standalone: true,
  selector: 'app-application-statistics',
  imports: [CommonModule], // Add more imports if your template needs them
  templateUrl: './application-statistics.html',
  styleUrls: ['./application-statistics.scss']
})
export class ApplicationStatisticsComponent implements OnInit {

  public applicationCount: AggregatedApplicationData[] = [];

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.applicationsService.aggregateInterviews().subscribe(res => {
      this.applicationCount = res;
    });
  }
}
