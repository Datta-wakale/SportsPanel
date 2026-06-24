import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const userGuard: CanActivateFn = () => {
  
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.user()) {
    return true;
  }

  return auth.isAdmin()
    ? router.createUrlTree(['/admin-dashboard'])
    : router.createUrlTree(['/login']);

};