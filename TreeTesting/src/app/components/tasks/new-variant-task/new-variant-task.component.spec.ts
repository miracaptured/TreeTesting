import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVariantTaskComponent } from './new-variant-task.component';

describe('NewVariantTaskComponent', () => {
  let component: NewVariantTaskComponent;
  let fixture: ComponentFixture<NewVariantTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVariantTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVariantTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
