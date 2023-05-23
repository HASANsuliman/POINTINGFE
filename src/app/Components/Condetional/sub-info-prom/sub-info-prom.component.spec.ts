import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubInfoPromComponent } from './sub-info-prom.component';

describe('SubInfoPromComponent', () => {
  let component: SubInfoPromComponent;
  let fixture: ComponentFixture<SubInfoPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubInfoPromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubInfoPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
