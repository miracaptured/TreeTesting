import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTaskInfoComponent } from './variant-task-info.component';

describe('VariantTaskInfoComponent', () => {
  let component: VariantTaskInfoComponent;
  let fixture: ComponentFixture<VariantTaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantTaskInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
