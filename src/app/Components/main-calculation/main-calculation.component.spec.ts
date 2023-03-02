import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalculationComponent } from './main-calculation.component';

describe('MainCalculationComponent', () => {
  let component: MainCalculationComponent;
  let fixture: ComponentFixture<MainCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
