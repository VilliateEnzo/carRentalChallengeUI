import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

export const alreadyAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const jwtService = inject(JwtService);
  const router = inject(Router);

  const user = authService.currentUser();
  const isAuthenticated = user && !jwtService.isTokenExpired(user.token);

  if (isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};