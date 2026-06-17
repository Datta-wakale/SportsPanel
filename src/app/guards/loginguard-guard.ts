import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const loginGuard: CanActivateFn = () => {
  // inject auth service and Router
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAdminLoggedIn()) {
    return router.createUrlTree(['/admin-dashboard']);
  }

  if (auth.getUser()) {
    return router.createUrlTree(['/booking']);
  }

  return true;
};