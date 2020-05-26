import { User } from './../../../shared/model/user.model';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${environment.backend}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  changeTwoFactorAuthentication(
    userName: string,
    current: boolean
  ): Observable<any> {
    if (current) {
      return this.disableTwoFactorAuthentication(userName);
    } else {
      return this.enableTwoFactorAuthentication(userName);
    }
  }

  enableTwoFactorAuthentication(userName: string): Observable<any> {
    return this.http.put(`${this.usersUrl}/${userName}/enable-two-factor`, {});
  }

  disableTwoFactorAuthentication(userName: string): Observable<any> {
    return this.http.put(`${this.usersUrl}/${userName}/disable-two-factor`, {});
  }
}
