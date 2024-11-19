import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column: Column = {name: '', values: []}
  @Input() isEditMode: boolean = true;
  @Input() isClosedTypeTest: boolean = false;

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

  addValue() {
    this.column.values.push(`item${this.column.values.length}`);
  }

  removeValue(index) {
    this.column.values.splice(index, 1);

  }

  trackByFn(index, _) {
    return index;  
  }
}