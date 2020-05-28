import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

const BEARER = 'Bearer ';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthInterceptorService implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.token.token;
    if (token != null && this.notLogin(req)) {
      req = req.clone({
        setHeaders: {
          Authorization: `${BEARER}${token}`,
        },
      });
    }
    return next.handle(req);
  }

  notLogin(req): boolean {
    return !req.url.includes('/auth/login');
  }
}
