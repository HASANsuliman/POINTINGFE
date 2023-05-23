import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubPromComponent } from './add-sub-prom.component';

describe('AddSubPromComponent', () => {
  let component: AddSubPromComponent;
  let fixture: ComponentFixture<AddSubPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubPromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
