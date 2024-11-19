import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/task';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task;

  @Input()
  answer: Answer;

  ngOnInit(): void {
  }
}
