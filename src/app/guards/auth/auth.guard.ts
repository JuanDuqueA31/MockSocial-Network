import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/services/auth/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.verifyToken()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};