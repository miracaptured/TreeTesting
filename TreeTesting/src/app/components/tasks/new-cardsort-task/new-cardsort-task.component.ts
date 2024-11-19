import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CardSortType } from 'src/app/models/card-sort-type';
import * as XLSX from 'xlsx';

type AOA = any[][];



@Component({
  selector: 'app-new-cardsort-task',
  templateUrl: './new-cardsort-task.component.html',
  styleUrls: ['./new-cardsort-task.component.scss']
})
export class NewCardsortTaskComponent implements OnInit {
  @Input()
  task: Task;

  @Input()
  editOnly: boolean;

  @Output() taskChange = new EventEmitter();

  changeTask() {
    this.taskChange.emit(this.task);
  }
  
  categoryName: string;
  CardSortType = CardSortType;

  constructor() {
  }

  ngOnInit(): void {
  }

  addCategory() {
    this.task.cardSortCategories.push(`category${this.task.cardSortCategories.length+1}`);
    this.changeTask();
  }

  addValue() {
    this.task.cardSortValues.push(`card${this.task.cardSortValues.length+1}`);
    this.changeTask();
  }

  trackByFn(index, item) {
    return index;
  }

  removeCategory(index) {
    this.task.cardSortCategories.splice(index, 1);
    this.changeTask();
  }

  removeValue(index) {
    this.task.cardSortValues.splice(index, 1);
    this.changeTask();
  }

  isCardSortTypeOpen = () => this.task.cardSortType === CardSortType.Open;

  onFileSelected(evt) {
    this.task.cardSortCategories = [];
    this.task.cardSortValues = [];

    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data without headers row*/
      let data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 })).slice(1);
      this.task.cardSortValues = data.map(row => row[0]);
      this.task.cardSortCategories = data.map(row => row[1]);
    };
    reader.readAsBinaryString(target.files[0]);
    this.changeTask();
  }

  downloadTemplate() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/file-templates/cardsort_template.xlsx';
    link.download = 'cardsort_template.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
