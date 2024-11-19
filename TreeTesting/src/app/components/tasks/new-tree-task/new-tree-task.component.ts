import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TreeFileReader } from 'src/app/utils/tree-file-reader';


@Component({
  selector: 'app-new-tree-task',
  templateUrl: './new-tree-task.component.html',
  styleUrls: ['./new-tree-task.component.scss'],
})
export class NewTreeTaskComponent implements OnInit {
  @Input()
  task: Task;
  fileName: string;

  @Input()
  editOnly: boolean;
  
  @Output() taskChange = new EventEmitter();

  changeTask() {
    this.taskChange.emit(this.task);
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.editOnly) {
      this.task.tree.initialize();
    }
  }


  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    const fileReader = new FileReader();

    if (file.name.toLowerCase().endsWith('.xlsx')) {
      fileReader.onload = (e) => { this.task.tree.initialize(TreeFileReader.readXLSX(fileReader.result)); };
      fileReader.readAsBinaryString(file);
    } else if (file.name.toLowerCase().endsWith('.json')) {
      fileReader.onload = (e) => { this.task.tree.initialize(TreeFileReader.readJSON(fileReader.result as string)); };
      fileReader.readAsText(file);
    }
  }

  downloadTemplate() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/file-templates/tree_template.xlsx';
    link.download = 'tree_template.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
