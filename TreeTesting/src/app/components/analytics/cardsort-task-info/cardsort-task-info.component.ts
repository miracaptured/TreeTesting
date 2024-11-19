import { Component, Input } from '@angular/core';
import { CardSortTaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-cardsort-task-info',
  templateUrl: './cardsort-task-info.component.html',
  styleUrls: ['./cardsort-task-info.component.scss']
})
export class CardsortTaskInfoComponent {
  @Input()
  taskInfo: CardSortTaskInfo;
}
