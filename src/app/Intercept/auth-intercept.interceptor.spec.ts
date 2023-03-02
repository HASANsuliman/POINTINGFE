import { TestBed } from '@angular/core/testing';

import { AuthInterceptInterceptor } from './auth-intercept.interceptor';

describe('AuthInterceptInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptInterceptor = TestBed.inject(AuthInterceptInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
