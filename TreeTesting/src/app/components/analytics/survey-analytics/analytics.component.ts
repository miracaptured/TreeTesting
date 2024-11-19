import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AnalyticsReportExtended } from 'src/app/models/analytics-report';
import { TaskType } from 'src/app/models/task-type';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { SurveyService } from 'src/app/services/survey.service';
import { map } from 'rxjs';
import { SurveyWithAnswers } from 'src/app/models/survey';
import { MatTableDataSource } from '@angular/material/table';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements AfterViewInit {

  analyticsReport : AnalyticsReportExtended;
  surveyWithAnswers : SurveyWithAnswers;
  TaskTypeEnum = TaskType;

  constructor(
    private _analyticsService: AnalyticsService,
    private _surveyService: SurveyService,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _transloco: TranslocoService,    
  ) {

  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this._analyticsService.getAnalyticsReport(params['id']).subscribe(report => this.analyticsReport = report);
      this._surveyService.getSurveyWithAnswersById(params['id'])
        .pipe(map((resp : any) => resp.data))
        .subscribe(survey => {
          this.surveyWithAnswers = this._surveyService.jsonToSurveyWithAnswers(survey);
          console.log("TEST: ", this.surveyWithAnswers.taskGroups[0].tasks[0].answers);
        });
    });
  }

  saveReport() : void {
    html2canvas(document.getElementById("report"), {scale: 2}).then(canvas => {
      const doc = new jsPDF(canvas.width > canvas.height ? 'l' : 'p', 'px', [canvas.width, canvas.height]);
      var imgData  = canvas.toDataURL("image/png", 1.0);
      doc.setFillColor("255");
      doc.rect(0, 0, canvas.width, canvas.height, "F");
      doc.addImage(imgData, 0, 0, canvas.width, canvas.height);
      doc.save(`${this.analyticsReport?.surveyName ?? "report"}_${(new Date()).toISOString()}.pdf`);
    });
  }

  saveResponses() : void {
    let workbookName = (this.analyticsReport?.surveyName ?? "").concat(`_${this._transloco.translate('analytics.report.responses')}.xlsx`)
    this._analyticsService.getResponsesFile(this.analyticsReport.surveyId).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const element = document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = workbookName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  async showMessageCopy() {
    this.snackBar.open(this._transloco.translate('survey.table.copiedToBufferLabel'), null, {
      duration: 2000
    });
  }
}
