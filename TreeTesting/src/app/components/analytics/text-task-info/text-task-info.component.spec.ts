import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTaskInfoComponent } from './text-task-info.component';

describe('TextTaskInfoComponent', () => {
  let component: TextTaskInfoComponent;
  let fixture: ComponentFixture<TextTaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTaskInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
