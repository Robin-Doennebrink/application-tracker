import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../services/application.service';
import { AggregatedApplicationData } from '../../models/application-entry.model';
import {StatusLabels} from "../../models/status.enum";
import { PlotlyModule } from 'angular-plotly.js';
import {StageLabels} from "../../models/stage.enum";

@Component({
  standalone: true,
  selector: 'app-application-statistics',
  imports: [CommonModule, PlotlyModule],
  templateUrl: './application-statistics.html',
  styleUrls: ['./application-statistics.scss']
})
export class ApplicationStatisticsComponent implements OnInit {
  statusData: any[] = [];
  maxStageData: any[] = [];
  layout1: any = {};
  layout2: any = {};
  config = { responsive: true };

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.applicationsService.aggregateInterviews().subscribe((res: AggregatedApplicationData) => {
      this.statusData = [
        {
          x: res.status_counts.map(item => StatusLabels[item.status]),
          y: res.status_counts.map(item => item.count),
          type: 'bar',
          marker: { color: 'steelblue' },
        },
      ];

      this.maxStageData = [
        {
          x: res.max_stage_counts.map(item => StageLabels[item.max_stage]),
          y: res.max_stage_counts.map(item => item.count),
          type: 'bar',
          marker: { color: 'steelblue' },
        }
      ]

      this.layout1 = {
        title: 'Applications by Status',
        yaxis: {
          title: 'Count', tickmode: 'linear',
          dtick: 1,
          tickformat: ',d'
        },
        xaxis: { title: 'Count' },
      };

      this.layout2 = {
        title: 'Applications by Max Stage',
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
