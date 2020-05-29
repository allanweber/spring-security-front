import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const TOKEN = 'token';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const token = params[TOKEN];
        if (token) {
          this.authService.authenticateSocial(token);
        } else {
          this.router.navigate(['/auth/signIn']);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
