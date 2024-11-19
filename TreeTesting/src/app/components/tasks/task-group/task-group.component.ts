import { Component, Input, OnInit } from '@angular/core';
import { AnswerGroup } from 'src/app/models/answer-group';
import { TaskGroup } from 'src/app/models/task-group';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {
  @Input()
  taskGroup: TaskGroup;

  @Input()
  answerGroup: AnswerGroup;

  ngOnInit(): void {
    this.answerGroup.timeSpentSeconds = new Date().getTime();
  }

}
