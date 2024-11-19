import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../../models/task';
import { TaskType } from 'src/app/models/task-type';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit {

  TaskType = TaskType;

  @Input()
  task: Task;

  @Input()
  editOnly: boolean;

  @Output() taskChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
