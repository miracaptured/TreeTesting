import { Component, Input, OnInit } from '@angular/core';
import { Survey } from '../../../models/survey';
import { Task } from '../../../models/task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyService } from '../../../services/survey.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TaskType } from 'src/app/models/task-type';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskGroup } from 'src/app/models/task-group';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {
  
  TaskTypeEnum = TaskType;
  @Input()
  survey: Survey;

  @Input()
  editOnly: boolean = false;

  constructor(
    private _surveyService: SurveyService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _translocoService: TranslocoService
  ) {
  }

  ngOnInit(): void {
    if (!this.survey) {
      this.survey = new Survey;
    }
    if (!this.survey?.id) {
      this.survey.name = this._translocoService.translate('survey.newSurveyName');
      this.survey.description = this._translocoService.translate('survey.newSurveyDescription')
    }
  }

  getIcon(taskType) {
    switch (taskType) {
      case TaskType.TextQuestion: return 'text_task';
      case TaskType.VariantTask: return 'variant_task';
      case TaskType.CardSort: return 'cardsort_task';
      case TaskType.TreeTesting: return 'treetest_task';
    }

    return 'question_mark';
  }

  addTask(taskGroupIndex, type) {
    let task = new Task;
    task.type = type;
    task.name = `${this._translocoService.translate('survey.taskNameLabel')} ${this.survey.taskGroups.reduce((total, curVal) => total + curVal.tasks.length, 0)}`;
    this.survey.taskGroups[taskGroupIndex].tasks.push(task);
  }

  addTaskGroup() {
    this.survey.taskGroups.push(new TaskGroup(`${this._translocoService.translate('survey.taskGroupLabel')} ${this.survey.taskGroups.length + 1}`));
  }

  removeTask(taskGroupIndex, taskIndex) {
    this.survey.taskGroups[taskGroupIndex].tasks.splice(taskIndex, 1);
  }

  removeTaskGroup(taskGroupIndex) {
    this.survey.taskGroups.splice(taskGroupIndex, 1);
  }

  saveSurvey() {
    if (!!this.survey.id) {
      this._surveyService.updateSurvey(this.survey).pipe(
        catchError(err => {
            this._snackBar.open(err, null, {
              duration: 3000
            });
          return throwError(err);
        })
      ).subscribe((res : any) => {
        if (res.data) {
          this._router.navigateByUrl('/dashboard')
        }
      });
    } else {
      this.survey.creatorId = UserService.CurrentUser.id;
      this._surveyService.createSurvey(this.survey).pipe(
        catchError(err => {
            this._snackBar.open(err, null, {
              duration: 3000
            });
          return throwError(err);
        })
      ).subscribe((res : any) => {
        if (res.data) {
          this._router.navigateByUrl('/dashboard')
        }
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.addTask(event.container.id.split('-')[1], event.item.data);
    }
  }

  dropTask(event: CdkDragDrop<Task[]>, taskGroupIndex) {
    if (event.previousContainer === event.container) {
      let temp = this.survey.taskGroups[taskGroupIndex].tasks[event.previousIndex];
      this.survey.taskGroups[taskGroupIndex].tasks[event.previousIndex] = this.survey.taskGroups[taskGroupIndex].tasks[event.currentIndex];
      this.survey.taskGroups[taskGroupIndex].tasks[event.currentIndex] = temp;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
