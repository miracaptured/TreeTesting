import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsortTaskInfoComponent } from './cardsort-task-info.component';

describe('CardsortTaskInfoComponent', () => {
  let component: CardsortTaskInfoComponent;
  let fixture: ComponentFixture<CardsortTaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsortTaskInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsortTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
