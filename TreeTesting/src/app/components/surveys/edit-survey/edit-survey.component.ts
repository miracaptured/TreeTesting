import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {

  survey: Survey;

  constructor(
    private _surveyService: SurveyService,
    public route: ActivatedRoute,
    public _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._surveyService.getSurveyById(params['id'])
      .pipe(
        catchError(err => {
          this._snackBar.open(err, null, {
            duration: 3000
          });
          return throwError(err);
        })
      )
      .subscribe(response => {
        if (response['data']) {
          this.survey = this._surveyService.jsonToSurvey(response['data']);
        }
      });
    });
  }
}
