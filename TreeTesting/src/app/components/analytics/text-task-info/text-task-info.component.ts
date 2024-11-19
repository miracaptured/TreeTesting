import { Component, Input, OnInit } from '@angular/core';
import { TextTaskInfo } from 'src/app/models/task-info';
import { ChartOptions } from 'src/app/models/chart-options';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-text-task-info',
  templateUrl: './text-task-info.component.html',
  styleUrls: ['./text-task-info.component.scss']
})
export class TextTaskInfoComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  @Input()
  taskInfo: TextTaskInfo;

  constructor(private translocoService: TranslocoService) {}

  buildSeries = () => Object({
    'data': this.taskInfo.popularAnswers.map(info => Object({
      'x': info.text,
      'y': info.count
    }))
  });

ngOnInit(): void {
  this.chartOptions = {
    series: [this.buildSeries()],
    legend: {
      show: true,
    },
    chart: {
      height: 350,
      type: "bar",
    },
    dataLabels: {
      enabled: true,
    },
    colors: [
      '#3EA942', '#D3C0D4', '#E76A6C', '#9c3f2f', '#5c8c46', '#7c468c'
    ],
    title: {
      text: this.translocoService.translate('analytics.text.popularAnswersLabel'),
      align: "center"
    },
  };
}
}
