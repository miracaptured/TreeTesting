import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Answer } from 'src/app/models/answer';
import { TreeTestingTaskInfo } from 'src/app/models/task-info';


@Component({
  selector: 'app-tree-task-info',
  templateUrl: './tree-task-info.component.html',
  styleUrls: ['./tree-task-info.component.scss']
})
export class TreeTaskInfoComponent {

  @Input()
  task: Task;

  @Input()
  taskInfo: TreeTestingTaskInfo;

  constructor() {
  }

  /*getPopularRoutes() {
    let uniques = this.answers.map(answer => answer.clickTrace.join(' -> ')).reduce((acc, val) => {
      acc[val] = acc[val] || {trace: val, count: 0};
      acc[val].count++;
      return acc;
    }, {});

    const result = Object.values(uniques).map(({ trace, count}) => ({ trace, count }));

    return result;
  }*/
}
