import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TreeEditComponent } from './components/tree/tree-edit/tree-edit.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {A11yModule} from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;




import { SurveyResponseComponent } from './components/surveys/survey-response/survey-response.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnalyticsComponent } from './components/analytics/survey-analytics/analytics.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { SurveysTableComponent } from './components/surveys/surveys-table/surveys-table.component';
import { NewTaskFormComponent } from './components/tasks/new-task-form/new-task-form.component';
import { InterceptorService } from './services/interceptor.service';
import { TreeConstructorFormComponent } from './components/tree/tree-constructor-form/tree-constructor-form.component';
import { VariantTaskInfoComponent } from './components/analytics/variant-task-info/variant-task-info.component';
import { TreeTaskInfoComponent } from './components/analytics/tree-task-info/tree-task-info.component';
import { TaskInfoComponent } from './components/analytics/task-info/task-info.component';
import { TextTaskInfoComponent } from './components/analytics/text-task-info/text-task-info.component';
import { NewTextTaskComponent } from './components/tasks/new-text-task/new-text-task.component';
import { NewVariantTaskComponent } from './components/tasks/new-variant-task/new-variant-task.component';
import { NewTreeTaskComponent } from './components/tasks/new-tree-task/new-tree-task.component';
import { NewCardsortTaskComponent } from './components/tasks/new-cardsort-task/new-cardsort-task.component';
import { ColumnComponent } from './components/tasks/cardsort/column/column.component';
import { BoardComponent } from './components/tasks/cardsort/board/board.component';
import { SortingPanelComponent } from './components/tasks/cardsort/sorting-panel/sorting-panel.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { ConditionalInputComponent } from './components/conditional-input/conditional-input.component';
import { HeatmapComponent } from './components/analytics/heatmap/heatmap.component';
import { TreemapComponent } from './components/analytics/treemap/treemap.component';
import { LoadingInterceptor } from './services/loading-interceptor.service';
import { CardsortTaskInfoComponent } from './components/analytics/cardsort-task-info/cardsort-task-info.component';
import { ChartComponent } from './components/analytics/chart/chart.component';
import { TaskGroupComponent } from './components/tasks/task-group/task-group.component';
import { NewSurveyComponent } from './components/surveys/new-survey/new-survey.component';
import { PlotlyChartComponent } from './components/analytics/plotly-chart/plotly-chart.component';
import { DendrogramComponent } from './components/analytics/dendrogram/dendrogram.component';
import { TranslocoRootModule } from './transloco-root.module';
import { SemiCircleChartComponent } from './components/analytics/semi-circle-chart/semi-circle-chart.component';
import { PieTreeComponent } from './components/analytics/pie-tree/pie-tree.component';
import { MatchTableComponent } from './components/analytics/match-table/match-table.component';
import { HelpComponent } from './components/help/help.component';
import { GridColsDirective } from './directives/grid-cols.directive';
import { EditSurveyComponent } from './components/surveys/edit-survey/edit-survey.component';
import { ReportComponent } from './components/analytics/report/report.component';
import { AnswersTableComponent } from './components/analytics/answers-table/answers-table.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,    
    TreeEditComponent,
    SurveyResponseComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AnalyticsComponent,
    TaskComponent,
    SurveysTableComponent,
    NewTaskFormComponent,
    TreeConstructorFormComponent,
    VariantTaskInfoComponent,
    TreeTaskInfoComponent,
    TaskInfoComponent,
    TextTaskInfoComponent,
    NewTextTaskComponent,
    NewVariantTaskComponent,
    NewTreeTaskComponent,
    NewCardsortTaskComponent,
    ColumnComponent,
    BoardComponent,
    SortingPanelComponent,
    SideNavigationComponent,
    ConditionalInputComponent,
    HeatmapComponent,
    TreemapComponent,
    CardsortTaskInfoComponent,
    ChartComponent,
    TaskGroupComponent,
    NewSurveyComponent,
    PlotlyChartComponent,
    DendrogramComponent,
    SemiCircleChartComponent,
    PieTreeComponent,
    MatchTableComponent,
    HelpComponent,
    GridColsDirective,
    EditSurveyComponent,
    AnswersTableComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatTreeModule,
    MatStepperModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    HttpClientModule,
    ClipboardModule,
    MatDividerModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    NgApexchartsModule,
    A11yModule,
    MatProgressSpinnerModule,
    LoadingIndicatorComponent,
    PlotlyModule,
    TranslocoRootModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
