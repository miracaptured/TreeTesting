import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-new-variant-task',
  templateUrl: './new-variant-task.component.html',
  styleUrls: ['./new-variant-task.component.scss']
})
export class NewVariantTaskComponent {
  @Input()
  task: Task;

  @Input()
  editOnly: boolean;

  @Output() taskChange = new EventEmitter();

  changeTask() {
    this.taskChange.emit(this.task);
  }

  removeVariant(i) : void {
    this.task.answerVariants.splice(i, 1);
    this.changeTask();
  }

  trackByFn(index, _) {
    return index;  
  }
}
