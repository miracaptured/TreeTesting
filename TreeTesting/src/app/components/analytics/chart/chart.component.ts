import { Component, Input } from '@angular/core';
import { ChartOptions } from 'src/app/models/chart-options';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input()
  public chartOptions: Partial<ChartOptions>;
}
