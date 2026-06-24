import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const loginGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);
  //if admin is valid
  if (auth.isAdmin()) {
    return router.createUrlTree(['/admin-dashboard']);
  }
  // if user is validate
  if (auth.user()) {
    return router.createUrlTree(['/booking']);
  }
  return true;
};