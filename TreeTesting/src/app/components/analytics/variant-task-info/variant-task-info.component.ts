import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ChartOptions } from 'src/app/models/chart-options';
import { VariantTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-variant-task-info',
  templateUrl: './variant-task-info.component.html',
  styleUrls: ['./variant-task-info.component.scss']
})
export class VariantTaskInfoComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  @Input()
  taskInfo: VariantTaskInfo;

  buildData = () => Object({
      labels: this.taskInfo.percentByVariant.map(info => info.variant),
      series: this.taskInfo.percentByVariant.map(info => info.percent)
    });
  
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    let chartData = this.buildData();
    this.chartOptions = {
      series: chartData.series,
      legend: {
        show: true,
      },
      labels: chartData.labels,
      chart: {
        height: 350,
        type: "pie",
      },
      dataLabels: {
        enabled: true,
      },
      colors: [
        '#3EA942', '#D3C0D4', '#E76A6C', '#9c3f2f', '#5c8c46', '#7c468c'
      ],
      title: {
        text: this.translocoService.translate('analytics.variant.variantDistributionLabel'),
        align: "center"
      },
    };
  }
}
