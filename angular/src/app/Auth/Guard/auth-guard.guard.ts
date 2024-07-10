import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  if (authService.isAuthenticated() && (role === "photographe" || role === "admin")) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
