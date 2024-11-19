import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeConstructorFormComponent } from './tree-constructor-form.component';

describe('TreeConstructorFormComponent', () => {
  let component: TreeConstructorFormComponent;
  let fixture: ComponentFixture<TreeConstructorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeConstructorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeConstructorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
