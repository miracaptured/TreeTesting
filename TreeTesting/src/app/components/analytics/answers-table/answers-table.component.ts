import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Answer } from 'src/app/models/answer';
import { Board } from 'src/app/models/board';
import { TaskWithAnswers } from 'src/app/models/task';

@Component({
  selector: 'app-answers-table',
  templateUrl: './answers-table.component.html',
  styleUrls: ['./answers-table.component.scss']
})
export class AnswersTableComponent implements OnChanges {

  @ViewChild('myTable', { static: false }) table: MatTable<any>;
  answers = new MatTableDataSource();

  @Input()
  public task: TaskWithAnswers

  constructor() {}

  ngOnChanges(): void {
    this.answers.data = this.task.answers;
    
  }

  getStringBoardView(board: Board) {
    if (!board) return '';

    return board.columns.slice(1, -1).map(column => `${column.name}: ${column.values.join(', ')}`).join('\n');
  }

  getStringClickTraceView(clickTrace: string[]) {
    if (!clickTrace) return '';

    return clickTrace.join(" -> ");
  }

  getDisplayedColumns(task) {
    switch(task.type) {
      case 0:
        return ['responseId', 'text'];

      case 1:
        return ['responseId', 'variantAnswer']
      
      case 2:
        return ['responseId', 'cardsort'];
      
      case 3:
        return ['responseId', 'clickTrace'];

    }

    return ['responseId'];
  }
}
