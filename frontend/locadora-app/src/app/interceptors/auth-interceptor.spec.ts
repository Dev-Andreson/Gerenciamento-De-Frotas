import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: AuthService;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {
          provide: AuthService,
          useValue: {
            getToken: () => null
          }
        },
        {
          provide: HttpHandler,
          useValue: {
            handle: () => of({})
          }
        }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService);
    httpHandler = TestBed.inject(HttpHandler);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', () => {
    const token = 'test-token';
    spyOn(authService, 'getToken').and.returnValue(token);
    spyOn(httpHandler, 'handle').and.callThrough();

    const req = new HttpRequest('GET', '/test');
    interceptor.intercept(req, httpHandler);

    expect(authService.getToken).toHaveBeenCalled();
    expect(httpHandler.handle).toHaveBeenCalled();
    
    const clonedReq = (httpHandler.handle as any).calls.mostRecent().args[0];
    expect(clonedReq.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header when token is null', () => {
    spyOn(authService, 'getToken').and.returnValue(null);
    spyOn(httpHandler, 'handle').and.callThrough();

    const req = new HttpRequest('GET', '/test');
    interceptor.intercept(req, httpHandler);

    expect(authService.getToken).toHaveBeenCalled();
    expect(httpHandler.handle).toHaveBeenCalled();
    
    const clonedReq = (httpHandler.handle as any).calls.mostRecent().args[0];
    expect(clonedReq.headers.has('Authorization')).toBeFalse();
  });
});