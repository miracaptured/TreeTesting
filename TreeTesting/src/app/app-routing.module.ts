import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { NewSurveyComponent } from './components/surveys/new-survey/new-survey.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SurveyResponseComponent } from './components/surveys/survey-response/survey-response.component';
import { AnalyticsComponent } from './components/analytics/survey-analytics/analytics.component';
import { HelpComponent } from './components/help/help.component';
import { EditSurveyComponent } from './components/surveys/edit-survey/edit-survey.component';

const routes: Routes = [
  {path: 'new-survey', component: NewSurveyComponent},
  {path: 'dashboard', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'survey/:id', component: SurveyResponseComponent},
  {path: 'analytics/:id', component: AnalyticsComponent},
  {path: 'help', component: HelpComponent},
  {path: 'edit-survey/:id', component: EditSurveyComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
