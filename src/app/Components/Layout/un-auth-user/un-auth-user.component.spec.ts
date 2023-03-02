import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthUserComponent } from './un-auth-user.component';

describe('UnAuthUserComponent', () => {
  let component: UnAuthUserComponent;
  let fixture: ComponentFixture<UnAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
