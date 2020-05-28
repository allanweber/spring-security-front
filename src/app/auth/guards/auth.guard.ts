import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { RefreshTokenService } from './../services/refresh-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated.pipe(
      take(1),
      map((e) => {
        if (e) {
          this.refreshTokenService.refreshTokenTimer();
          return true;
        } else {
          this.authService.logout();
          this.refreshTokenService.stop();
          return false;
        }
      })
    );
  }
}
