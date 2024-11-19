import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersTableComponent } from './answers-table.component';

describe('AnswersTableComponent', () => {
  let component: AnswersTableComponent;
  let fixture: ComponentFixture<AnswersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
