import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegmentComponent } from './manegment.component';

describe('ManegmentComponent', () => {
  let component: ManegmentComponent;
  let fixture: ComponentFixture<ManegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
