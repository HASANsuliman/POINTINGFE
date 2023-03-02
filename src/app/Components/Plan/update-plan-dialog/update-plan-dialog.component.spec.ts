import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanDialogComponent } from './update-plan-dialog.component';

describe('UpdatePlanDialogComponent', () => {
  let component: UpdatePlanDialogComponent;
  let fixture: ComponentFixture<UpdatePlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlanDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
