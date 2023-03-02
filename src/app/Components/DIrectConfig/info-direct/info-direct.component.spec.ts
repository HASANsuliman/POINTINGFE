import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDirectComponent } from './info-direct.component';

describe('InfoDirectComponent', () => {
  let component: InfoDirectComponent;
  let fixture: ComponentFixture<InfoDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
