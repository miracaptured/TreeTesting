import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTaskInfoComponent } from './tree-task-info.component';

describe('TreeTaskInfoComponent', () => {
  let component: TreeTaskInfoComponent;
  let fixture: ComponentFixture<TreeTaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeTaskInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
