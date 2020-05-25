import { Observable } from 'rxjs';
import { User } from './../../shared/model/user.model';
import { Registration } from './../model/registration.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private signUpUrl = `${environment.backend}/registration/signUp`;
  private verifyEnabledUrl = `${environment.backend}/registration/verify/enabled`;

  constructor(private http: HttpClient) { }

  register(reg: Registration): Observable<User> {
    return this.http.post<User>(this.signUpUrl, reg);
  }

  isEmailVerifyEnabled(): Observable<boolean> {
    return this.http.get<boolean>(this.verifyEnabledUrl);
  }
}
