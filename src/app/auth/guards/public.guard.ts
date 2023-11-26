import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, take, tap, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuardService {


}


const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(

      tap((isAuthenticated: boolean) => {
          if (isAuthenticated) {
              router.navigate(['./']);
          }
      }),
      map(isAuthenticated => !isAuthenticated)
  );
}

export const canActivatePublicGuard:CanActivateFn = isAuthenticated;
export const canMatchPublicGuard:CanMatchFn = isAuthenticated;
