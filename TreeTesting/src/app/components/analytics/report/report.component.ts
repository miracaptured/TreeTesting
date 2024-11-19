import { Component, Input } from '@angular/core';
import { AnalyticsReportExtended } from 'src/app/models/analytics-report';
import { TaskType } from 'src/app/models/task-type';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  @Input()
  analyticsReport : AnalyticsReportExtended;
  TaskTypeEnum = TaskType;
}
