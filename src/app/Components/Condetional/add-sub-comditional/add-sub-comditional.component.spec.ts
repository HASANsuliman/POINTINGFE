import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubComditionalComponent } from './add-sub-comditional.component';

describe('AddSubComditionalComponent', () => {
  let component: AddSubComditionalComponent;
  let fixture: ComponentFixture<AddSubComditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubComditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubComditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
