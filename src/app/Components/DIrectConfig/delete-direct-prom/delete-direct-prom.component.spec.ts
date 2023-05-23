import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirectPromComponent } from './delete-direct-prom.component';

describe('DeleteDirectPromComponent', () => {
  let component: DeleteDirectPromComponent;
  let fixture: ComponentFixture<DeleteDirectPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDirectPromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDirectPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
