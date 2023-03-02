import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubConfigInfoComponent } from './sub-config-info.component';

describe('SubConfigInfoComponent', () => {
  let component: SubConfigInfoComponent;
  let fixture: ComponentFixture<SubConfigInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubConfigInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubConfigInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
