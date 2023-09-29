import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);

  authService.updateLoggedIn();

  if(localStorage.getItem('token')){

    return true;

  } else {

    const router: Router = inject(Router);
    router.navigate(['/login']);
    return false;

  }

}
