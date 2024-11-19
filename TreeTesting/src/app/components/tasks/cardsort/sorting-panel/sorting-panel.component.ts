
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { Column } from 'src/app/models/column';
import { Task } from 'src/app/models/task';
import { Answer } from 'src/app/models/answer';
import { CardSortType } from 'src/app/models/card-sort-type';

@Component({
  selector: 'app-sorting-panel',
  templateUrl: './sorting-panel.component.html',
  styleUrls: ['./sorting-panel.component.scss']
})
export class SortingPanelComponent implements OnInit {
  @Input()
  task: Task
  @Input()
  answer: Answer | undefined;

  categoryName: string = '';

  constructor(
    private _activateRoute: ActivatedRoute,
    private _surveyService: SurveyService,
    ) {
  }
  ngOnInit(): void {
    this.answer.board.columns = [new Column('values', [...Array.from(this.task.cardSortValues.values())]), ...Array.from(this.task.cardSortCategories.values()).map(cat => new Column(cat, []))];
  }

  isClosedTypeTest() : boolean {
    return this.task.cardSortType === CardSortType.Closed;
  }

  isEditMode() : boolean {
    return true; //UserService.CurrentUser?.user_id === this.response.respondent;
  }

  save() {
  }

  addCategory(name: string) {
    if (name && this.answer.board.columns.findIndex(cl => cl.name === name) === -1) {
      this.answer.board.columns.push(new Column(name));
    }
  }
}
