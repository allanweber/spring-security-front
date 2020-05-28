import { Injectable } from '@angular/core';
import { LoginResponse } from './../auth/model/login-response.mode';
import { RefreshTokenResponse } from './../auth/model/refresh-token-response.model';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut() {
    sessionStorage.clear();
  }

  public saveTokenDate(data: LoginResponse) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  }

  updateTokenDate(newToken: RefreshTokenResponse) {
    const tokenData = this.tokenData;
    tokenData.token = newToken.token;
    tokenData.expirationIn = newToken.expirationIn;
    tokenData.issuedAt = newToken.issuedAt;
    this.saveTokenDate(tokenData);
  }

  get tokenData(): LoginResponse {
    return JSON.parse(sessionStorage.getItem(TOKEN_KEY));
  }

  get token(): string {
    return this.tokenData?.token;
  }

  get roles(): string[] {
    return this.tokenData?.roles;
  }

  get expiration(): number {
    return this.tokenData?.expirationIn;
  }

  get issuedAt(): Date {
    return this.tokenData?.issuedAt;
  }
}
