import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ChartOptions } from 'src/app/models/chart-options';
import { CardSortTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.scss']
})
export class MatchTableComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  @Input()
  taskInfo: CardSortTaskInfo;

  constructor(private translocoService: TranslocoService) {
    
  }

  buildHeatMap(values, data) {
    let series = [];
    for (let i = 0; i < data.length; i++) {
      series.push({name: values[i], data: []})
      for (let j = 0; j < values.length; j++) {
        series[i].data.push({x: values[j], y: data[i][j]});
      }
    }

    return series;
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.buildHeatMap(this.taskInfo.values, this.taskInfo.matchTableData),
      chart: {
        height: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: true,
      },
      colors: [
        '#3EA942'
      ],
      title: {
        text: this.translocoService.translate('analytics.matchTableLabel')
      },
    };
  }
}
