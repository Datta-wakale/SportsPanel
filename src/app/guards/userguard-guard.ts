import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const userGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.getUser()) {
    return true;
  }

  if (auth.isAdminLoggedIn()) {
    return router.createUrlTree(['/admin-dashboard']);
  }

  return router.createUrlTree(['/login']);
};