import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDirectPromComponent } from './info-direct-prom.component';

describe('InfoDirectPromComponent', () => {
  let component: InfoDirectPromComponent;
  let fixture: ComponentFixture<InfoDirectPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDirectPromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDirectPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
