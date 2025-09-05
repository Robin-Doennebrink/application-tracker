import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../services/application.service';
import { AggregatedApplicationData } from '../../models/application-entry.model';
import {StatusLabels} from "../../models/status.enum";
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  standalone: true,
  selector: 'app-application-statistics',
  imports: [CommonModule, PlotlyModule],
  templateUrl: './application-statistics.html',
  styleUrls: ['./application-statistics.scss']
})
export class ApplicationStatisticsComponent implements OnInit {
  plotData: any[] = [];
  layout: any = {};
  config = { responsive: true };

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.applicationsService.aggregateInterviews().subscribe((res: AggregatedApplicationData) => {
      this.plotData = [
        {
          x: res.status_counts.map(item => StatusLabels[item.status]),
          y: res.status_counts.map(item => item.count),
          type: 'bar',
          marker: { color: 'steelblue' },
        },
      ];

      this.layout = {
        title: 'Applications by Status',
        yaxis: {
          title: 'Count', tickmode: 'linear',
          dtick: 1,
          tickformat: ',d'
        },
        xaxis: { title: 'Count' },
      };
    });
  }
}
