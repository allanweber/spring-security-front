import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backEnd = environment.backend;
  private authenticatedUrl = `${this.backEnd}/authenticated`;
  private loginUrl = `${this.backEnd}/login`;
  private logoutUrl = `${this.backEnd}/logout`;

  public authenticated = false;

  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(this.authenticatedUrl).pipe(
      map((e) => {
        this.authenticated = e;
        return e;
      })
    );
  }

  login(credentials) {
    const token =
      'Basic ' + btoa(credentials.username + ':' + credentials.password);
    const headers = new HttpHeaders().append('Authorization', token);

    this.http.get(this.loginUrl, { headers }).subscribe((response) => {
      console.log(response);
      sessionStorage.setItem('token', token);
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
