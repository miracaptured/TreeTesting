import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextTaskComponent } from './new-text-task.component';

describe('NewTextTaskComponent', () => {
  let component: NewTextTaskComponent;
  let fixture: ComponentFixture<NewTextTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTextTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTextTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
