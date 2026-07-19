import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => false,
            isAdmin: () => false
          }
        }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in and is admin', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'isAdmin').and.returnValue(true);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(authService.isAdmin).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block access and redirect to dashboard when user is not logged in', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(authService, 'isAdmin').and.returnValue(false);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(authService.isAdmin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should block access and redirect to dashboard when user is logged in but not admin', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'isAdmin').and.returnValue(false);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(authService.isAdmin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should block access and redirect to dashboard when user is not logged in but is admin (inconsistent state)', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(authService, 'isAdmin').and.returnValue(true);
    spyOn(router, 'navigate');

    // Act
    const result = guard.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(authService.isAdmin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should check isLoggedIn before isAdmin (short-circuit evaluation)', () => {
    // Arrange
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(authService, 'isAdmin');
    spyOn(router, 'navigate');

    // Act
    guard.canActivate();

    // Assert
    expect(authService.isLoggedIn).toHaveBeenCalled();
    // isAdmin não deve ser chamado devido ao short-circuit do operador &&
    expect(authService.isAdmin).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});