import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => false
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block access and redirect to login when user is not logged in', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to login exactly once when user is not logged in', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    // Act
    guard.canActivate();

    // Assert
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not redirect when user is logged in', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(router, 'navigate');

    // Act
    guard.canActivate();

    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should handle edge case when isLoggedIn returns undefined', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(undefined as any);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});