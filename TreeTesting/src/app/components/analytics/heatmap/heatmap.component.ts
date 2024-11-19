import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ChartOptions } from 'src/app/models/chart-options';
import { CardSortTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  @Input()
  taskInfo: CardSortTaskInfo;

  constructor(private translocoService: TranslocoService) {
    
  }

  buildHeatMap(categories, values, data) {
    let series = [];
    for (let i = 0; i < categories.length; i++) {
      series.push({name: categories[i], data: []})
      for (let j = 0; j < values.length; j++) {
        series[i].data.push({x: values[j], y: data[i][j]});
      }
    }

    return series;
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.buildHeatMap(this.taskInfo.categories, this.taskInfo.values, this.taskInfo.distribution),
      chart: {
        height: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: true,
      },
      colors: [
        '#3EA942', '#D3C0D4', '#E76A6C', '#9c3f2f', '#5c8c46', '#7c468c'
      ],
      title: {
        text: this.translocoService.translate('analytics.heatmapLabel')
      },
    };
  }
}
