import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComditionalComponent } from './main-comditional.component';

describe('MainComditionalComponent', () => {
  let component: MainComditionalComponent;
  let fixture: ComponentFixture<MainComditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
