import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationInfoComponent } from './calculation-info.component';

describe('CalculationInfoComponent', () => {
  let component: CalculationInfoComponent;
  let fixture: ComponentFixture<CalculationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
