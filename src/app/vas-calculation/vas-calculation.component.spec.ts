import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VasCalculationComponent } from './vas-calculation.component';

describe('VasCalculationComponent', () => {
  let component: VasCalculationComponent;
  let fixture: ComponentFixture<VasCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VasCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VasCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
