import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-surveys-table',
  templateUrl: './surveys-table.component.html',
  styleUrls: ['./surveys-table.component.scss']
})
export class SurveysTableComponent implements OnInit {
  @Input()
  surveys: [];

  constructor(public snackBar: MatSnackBar,
    private translocoService: TranslocoService) {}
  
  displayedColumns: string[] = ['dateCreated', 'name', 'actions'];

  ngOnInit(): void {
  }

  async showMessageCopy() {
    this.snackBar.open(this.translocoService.translate('survey.table.copiedToBufferLabel'), null, {
      duration: 2000
    });
  }
}
