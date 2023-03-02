import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDirectComponent } from './main-direct.component';

describe('MainDirectComponent', () => {
  let component: MainDirectComponent;
  let fixture: ComponentFixture<MainDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
