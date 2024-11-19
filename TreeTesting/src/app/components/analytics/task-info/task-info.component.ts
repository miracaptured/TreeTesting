import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Survey } from 'src/app/models/survey';
import { CardSortTaskInfo, TaskInfo, TextTaskInfo, TreeTestingTaskInfo, VariantTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {
  @Input()
  taskInfo: TaskInfo;

  constructor() {

  }
  ngOnInit(): void {
  }

  getTextTaskInfo = () => this.taskInfo as TextTaskInfo;

  getVariantTaskInfo = () => this.taskInfo as VariantTaskInfo;

  getCardSortTaskInfo = () => this.taskInfo as CardSortTaskInfo;

  getTreeTestingTaskInfo = () => this.taskInfo as TreeTestingTaskInfo;
}
