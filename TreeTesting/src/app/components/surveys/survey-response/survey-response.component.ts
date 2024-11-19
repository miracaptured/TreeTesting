import { Component } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Survey } from 'src/app/models/survey';
import { Response } from 'src/app/models/response';
import { Answer } from 'src/app/models/answer';
import { AnswerGroup } from 'src/app/models/answer-group';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent {

  survey: Survey = null;
  response: Response = null;

  startTime;
  endTime;

  constructor(
    private _surveyService: SurveyService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private translocoService: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.response = new Response();

    this.route.params.subscribe(params => {
      this._surveyService.getSurveyById(params['id']).subscribe(res => {
        if (res['data']) {
          this.survey = this._surveyService.jsonToSurvey(res['data']);
          this.response.surveyId = this.survey.id;
          this.response.answerGroups = this.survey.taskGroups.map(taskGroup => new AnswerGroup(taskGroup.name, 0, taskGroup.tasks.map((task, taskIndex) => new Answer(taskGroup.name, taskIndex))));
          this.startTime = new Date().getTime();
        } else {
          this._router.navigateByUrl('/login').then(() => this._snackBar.open(this.translocoService.translate('survey.noSuchSurveyMessage'), null, {
            duration: 2000
          }));
        }
      })
    });
  }

  updateAnswerTime(i) {
    this.response.answerGroups[i].timeSpentSeconds = Math.round((new Date().getTime()) - this.response.answerGroups[i].timeSpentSeconds) / 1000;
  }

  complete() {
    this.endTime = new Date().getTime();
    this.response.answerGroups[this.response.answerGroups.length - 1].timeSpentSeconds = Math.round(this.endTime - this.response.answerGroups[this.response.answerGroups.length - 1].timeSpentSeconds) / 1000;
    this.response.timeSpentSeconds = Math.round((this.endTime - this.startTime) / 1000);
    this._surveyService.addResponse(this.response).subscribe(res => {
      this._snackBar.open(this.translocoService.translate('survey.thanksForParticipationMessage'), null, {
        duration: 2000
      });
      this._router.navigateByUrl('/login');
    });
  }
}
