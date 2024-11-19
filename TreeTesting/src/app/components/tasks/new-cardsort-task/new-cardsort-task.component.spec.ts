import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardsortTaskComponent } from './new-cardsort-task.component';

describe('NewCardsortTaskComponent', () => {
  let component: NewCardsortTaskComponent;
  let fixture: ComponentFixture<NewCardsortTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardsortTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardsortTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
