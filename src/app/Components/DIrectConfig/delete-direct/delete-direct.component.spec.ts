import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirectComponent } from './delete-direct.component';

describe('DeleteDirectComponent', () => {
  let component: DeleteDirectComponent;
  let fixture: ComponentFixture<DeleteDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
