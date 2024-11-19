import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-new-text-task',
  templateUrl: './new-text-task.component.html',
  styleUrls: ['./new-text-task.component.scss']
})
export class NewTextTaskComponent {
  @Input()
  task: Task;
  @Output() taskChange = new EventEmitter();

  changeTask() {
    this.taskChange.emit(this.task);
  }

  
}
