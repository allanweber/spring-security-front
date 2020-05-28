import { takeUntil, mergeMap } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './../../core/token-storage.service';
import { Injectable } from '@angular/core';

const MILES = 1000;
const SIXTY = 60;
const SECONDS_BEFORE_REFRESH = 20;

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private stopTimer: Subject<boolean>;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {}

  stop() {
    this.stopTimer.next(true);
  }

  refreshTokenTimer() {
    const expire = this.getTime();

    this.stopTimer = new Subject<boolean>();

    timer(expire.startTimer, expire.nextTimer)
      .pipe(
        takeUntil(this.stopTimer),
        mergeMap(() => {
          console.log('Refreshing Token');
          return this.authService.refreshToken();
        })
      )
      .subscribe(
        (response) => {
          this.tokenStorage.updateTokenDate(response);
        },
        () => this.authService.logout()
      );
  }

  private getTime(): {startTimer, nextTimer} {
    let nextTimer = this.tokenStorage.expiration;
    if (nextTimer > 0) {
      nextTimer = (this.tokenStorage.expiration - SECONDS_BEFORE_REFRESH) * MILES;
    } else {
      nextTimer = SIXTY * MILES;
    }

    const issuedAt = new Date(this.tokenStorage.issuedAt);
    const expireOn = new Date(issuedAt);
    expireOn.setSeconds(expireOn.getSeconds() + this.tokenStorage.expiration);

    const now = new Date();
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let startTimer = (expireOn.getTime() - now.getTime()) / MILES;
    startTimer = (startTimer - SECONDS_BEFORE_REFRESH) * MILES;

    if (startTimer < 0) {
      startTimer = 0;
    }

    return { startTimer, nextTimer };
  }
}
