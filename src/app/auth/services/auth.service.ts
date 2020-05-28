import { Authenticated } from './../model/authenticated.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../shared/model/user.model';
import { environment } from './../../../environments/environment';
import { TokenStorageService } from './../../core/token-storage.service';
import { AuthUser } from './../../shared/model/auth-user.model';
import { LoginResponse } from './../model/login-response.mode';
import { RefreshTokenResponse } from './../model/refresh-token-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser>({} as AuthUser);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  populate() {
    if (this.tokenStorage.token) {
      this.isAuthenticatedSubject.next(true);
      this.getAuthUser();
    } else {
      this.purgeAuth();
    }
  }

  authenticate(credentials) {
    this.http
      .post<LoginResponse>(
        `${environment.backend}/auth/login`,
        credentials,
        this.httpOptions
      )
      .subscribe((response) => {
        if (response && response.token != null) {
          this.setAuth(response);
          this.router.navigate(['/']);
        }
      });
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.backend}/auth/is-admin`);
  }

  logout() {
    this.tokenStorage.signOut();
    this.purgeAuth();
    this.router.navigate(['/auth/signIn']);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.get<RefreshTokenResponse>(
      `${environment.backend}/auth/refreshToken`
    );
  }

  private getAuthUser() {
    this.http
      .get<AuthUser>(`${environment.backend}/auth/auth-user`)
      .subscribe((response) => this.currentUserSubject.next(response));
  }

  private purgeAuth() {
    this.currentUserSubject.next({} as AuthUser);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuth(response: LoginResponse) {
    this.tokenStorage.saveTokenDate(response);
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }
}
