import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthInterceptorService implements HttpInterceptor {
  tokenString: any;
  constructor() {
    // Codigo de inicializacion del componente
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.tokenString = atob(sessionStorage.getItem('tokenAuth'));

    if (sessionStorage.getItem('username') && this.tokenString) {
      req = req.clone({
        setHeaders: {
          Authorization: atob(sessionStorage.getItem('tokenAuth')),
        },
      });
    }
    return next.handle(req);
  }
}
