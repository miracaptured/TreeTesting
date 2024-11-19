import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieTreeComponent } from './pie-tree.component';

describe('PieTreeComponent', () => {
  let component: PieTreeComponent;
  let fixture: ComponentFixture<PieTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
