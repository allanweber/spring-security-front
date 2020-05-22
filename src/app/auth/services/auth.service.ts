import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<Auth>(this.authenticatedUrl).pipe(
      map((response) => {
        if (response.authenticated) {
          this.user = response.user;
        }
        this.authenticated = response.authenticated;
        return this.authenticated;
      })
    );
  }

  login(credentials) {
    const token =
      'Basic ' + btoa(credentials.username + ':' + credentials.password);
    const headers = new HttpHeaders().append('Authorization', token);

    this.http
      .get<User>(this.loginUrl, { headers })
      .subscribe((response) => {
        sessionStorage.setItem('token', token);
        this.user = response;
        this.authenticated = true;
        this.router.navigate(['/']);
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
