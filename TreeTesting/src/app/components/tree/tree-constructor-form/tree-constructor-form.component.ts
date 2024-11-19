import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tree } from 'src/app/models/tree';

@Component({
  selector: 'app-tree-constructor-form',
  templateUrl: './tree-constructor-form.component.html',
  styleUrls: ['./tree-constructor-form.component.scss']
})
export class TreeConstructorFormComponent {

  newCategory: string = '';

  @Input()
  tree: Tree;

  @Input()
  trueRoute: string[];

  isCreatorMode = true;

  constructor(
    ) {}
}
