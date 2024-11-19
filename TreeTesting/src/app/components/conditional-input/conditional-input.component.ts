import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-conditional-input',
  templateUrl: './conditional-input.component.html',
  styleUrls: ['./conditional-input.component.scss']
})
export class ConditionalInputComponent implements OnInit {

  @Input()
  editOnly: boolean = false;

  @Input()
  value: any = '';

  @Output() valueChange = new EventEmitter();

  changeVal() {
    this.valueChange.emit(this.value);
  }

  @Input()
  label: string;

  isEditing: boolean = false;

  ngOnInit(): void {
  }
}
