import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreeTaskComponent } from './new-tree-task.component';

describe('NewTreeTaskComponent', () => {
  let component: NewTreeTaskComponent;
  let fixture: ComponentFixture<NewTreeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTreeTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTreeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
