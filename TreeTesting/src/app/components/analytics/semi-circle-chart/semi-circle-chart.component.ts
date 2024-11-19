import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ChartOptions } from 'src/app/models/chart-options';

@Component({
  selector: 'app-semi-circle-chart',
  templateUrl: './semi-circle-chart.component.html',
  styleUrls: ['./semi-circle-chart.component.scss']
})
export class SemiCircleChartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  @Input()
  values: number[];

  @Input()
  labels: string[];

  @Input()
  total: number;
  
  @Input()
  totalLabel: string;

  @Input()
  showAbsolute: boolean = false;

  @Input()
  all: number;

  constructor(private _translocoService: TranslocoService) {
    
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.values,
      chart: {
        type: "radialBar",
        sparkline: {
          enabled: true
        },
      },
      colors: [
        '#3EA942', '#D3C0D4', '#E76A6C'
      ],
      plotOptions: {
        radialBar: {
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 0, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "16px",
              color: 'black'
            },
            value: {
              show: true,
              fontSize: '16px',
              formatter: (val) => {
                return this.showAbsolute ?
                `${val}% (${Math.round(this.all * val / 100)})` :
                `${val}%`
              }
            },
            total: {
              show: this.values?.length > 1,
              label: this.totalLabel,
              formatter: (_) => this.total?.toString(),
              fontSize: '16px'
            }
          }
        }
      },
      
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      labels: this.labels,
    };
  }
}
