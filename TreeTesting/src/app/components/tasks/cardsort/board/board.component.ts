import { Component, Input } from '@angular/core';
import { Board } from 'src/app/models/board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board = new Board;
  @Input() isEditMode: boolean = true;
  @Input() isCLosedTypeTest: boolean = false;

  constructor() {
  }

  rowHeight() {
    let max = Math.max(...this.board.columns.map(col => col.values.length));
    return max > 0 ? `${max*0.8}rem` : '2rem';
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  removeCategory(name: string) {
    let index = this.board.columns.findIndex(cl => cl.name === name);
    while (this.board.columns[index].values.length > 0)
      transferArrayItem(
        this.board.columns[index].values,
        this.board.columns[0].values,
        0,
        this.board.columns[0].values.length
      );
    this.board.columns.splice(index, 1);
  }
}