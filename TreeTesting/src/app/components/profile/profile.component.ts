import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { TranslocoService } from '@ngneat/transloco';
import { SurveyService } from 'src/app/services/survey.service';
import { catchError, throwError } from 'rxjs';
import { AnalyticsReport } from 'src/app/models/analytics-report';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  surveys = new MatTableDataSource;

  constructor(
    private _router: Router,
    private _analyticsService: AnalyticsService,
    private _surveyService: SurveyService,
    private _transloco: TranslocoService,
    public _snackBar: MatSnackBar) {}
  
  displayedColumns: string[] = ['name', 'responses', 'dateCreated', 'actions'];

  ngOnInit(): void {
    if (UserService.checkUser() === false) this._router.navigateByUrl('/login');
    this.loadSurveyList();

    this.surveys.filterPredicate = function(data: AnalyticsReport, filter: string): boolean {
      return data.surveyName.toLowerCase().includes(filter) || data.dateCreated.toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.surveys.filter = filterValue.trim().toLowerCase();
  }

  async showMessageCopy() {
    this._snackBar.open(this._transloco.translate('survey.table.copiedToBufferLabel'), null, {
      duration: 2000
    });
  }

  loadSurveyList() {
    this._analyticsService.getReportsByUser().subscribe(reports => {      
      this.surveys.data = reports;
    });
  }

  duplicateSurvey(surveyId: string) {
    this._surveyService.getSurveyById(surveyId)
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
          let survey = this._surveyService.jsonToSurvey(response['data']);
          survey.name = `${this._transloco.translate('survey.copySurveyName')} ${survey.name}`;
          this._surveyService.createSurvey(survey).pipe(
            catchError(err => {
                this._snackBar.open(err, null, {
                  duration: 3000
                });
              return throwError(err);
            })
          ).subscribe((res : any) => {
            if (res.data) {
              this.loadSurveyList();
            }
          });
        }
      }
    );
  }

  deleteSurvey(surveyId: string) {
    this._surveyService.deleteSurvey(surveyId).pipe(
      catchError(err => {
        this._snackBar.open(err, null, {
          duration: 3000
        });
        return throwError(err);
      })
    ).subscribe(response => {
      if (response['data']) {
          this._snackBar.open(this._transloco.translate('survey.table.surveyDeletedLabel'), null, {
          duration: 3000
        });
        this.loadSurveyList();
      }
    })
  }
}