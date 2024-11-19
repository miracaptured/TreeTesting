import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { AnalyticsReport, AnalyticsReportExtended } from '../models/analytics-report';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private _apiService: ApiService
  ) { }

  getReportsByUser() : Observable<AnalyticsReport[]> {
    return this._apiService.getTypeRequest(`analytics/my`).pipe(map((response: any) => response.data));
  }

  getAnalyticsReport(surveyId: string) : Observable<AnalyticsReportExtended> {
    return this._apiService.getTypeRequest(`analytics/my/${surveyId}`).pipe(map((response : any) => response.data));
  }

  getResponsesFile(surveyId: string) : Observable<any> {
    return this._apiService.getTypeRequest(`survey/response/${surveyId}/file`, "arraybuffer").pipe(map((response: any) => response));
  }
}
