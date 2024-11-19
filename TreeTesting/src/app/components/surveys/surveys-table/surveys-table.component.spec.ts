import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysTableComponent } from './surveys-table.component';

describe('SurveysTableComponent', () => {
  let component: SurveysTableComponent;
  let fixture: ComponentFixture<SurveysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveysTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
