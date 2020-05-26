import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Auth } from './../model/auth.model';
import { Authority } from './../model/authority.model';
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backEnd = environment.backend;
  private authenticatedUrl = `${this.backEnd}/authenticated`;
  private loginUrl = `${this.backEnd}/login`;
  private logoutUrl = `${this.backEnd}/logout`;
  private setUpTwoFactorUrl = `${this.backEnd}/auth/setup-two-factor`;

  public authenticated = false;
  public user: User;

  constructor(private router: Router, private http: HttpClient) {}

  isAdmin(): Observable<boolean> {
    return this.isAuthenticated().pipe(
      map((resp) => {
        return (
          resp &&
          this.user?.authorities?.some((auth) => auth.authority === 'ADMIN')
        );
      })
    );
  }

  getAuthorities(): Observable<Authority[]> {
    return this.isAuthenticated().pipe(
      map((resp) => {
        return resp ? this.user?.authorities : null;
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<Auth>(this.authenticatedUrl, { observe: 'response' })
      .pipe(
        map((response) => {
          if (!response) {
            this.authenticated = false;
            return this.authenticated;
          }
          if (response.status === 202) {
            this.router.navigate(['/auth/two-factor']);
            return this.authenticated;
          }
          if (response.body.authenticated) {
            this.user = response.body.user;
          }
          this.authenticated = response.body.authenticated;
          return this.authenticated;
        })
      );
  }

  isTwoFactorAuthenticated(): Observable<boolean> {
    return this.http
      .get<Auth>(this.authenticatedUrl, { observe: 'response' })
      .pipe(
        map((response) => {
          if (response) {
            return response.status === 202;
          }
          return false;
        })
      );
  }

  setUpTwoFactor(): Observable<any> {
    return this.http.get<any>(this.setUpTwoFactorUrl);
  }

  login(credentials) {
    const token =
      'Basic ' + btoa(credentials.username + ':' + credentials.password);
    const headers = new HttpHeaders().append('Authorization', token);

    this.http
      .get<User>(this.loginUrl, { headers, observe: 'response' })
      .subscribe((response) => {
        sessionStorage.setItem('token', token);
        if (response.status === 200) {
          this.user = response.body;
          this.authenticated = true;
          this.router.navigate(['/']);
        } else if (response.status === 202) {
          this.router.navigate(['/auth/two-factor']);
        } else {
          this.authenticated = false;
          this.router.navigate(['/auth/signIn']);
        }
      });
  }

  loginTwoFactor(code: string) {
    return this.http
      .get<Auth>(`${this.authenticatedUrl}?two_code=${code}`, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response && response.status === 200) {
          this.user = response.body.user;
          this.authenticated = true;
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.http
      .get(this.logoutUrl)
      .pipe(
        map(() => {
          sessionStorage.removeItem('token');
          this.authenticated = false;
          this.router.navigate(['/auth/signIn']);
        })
      )
      .subscribe();
  }
}
