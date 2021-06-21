import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = false;
  isAuthStorage: string;
  authRequest: any = {};
  storage: any;
  tokeString: any = '';
  isActivateAccount = false;

  constructor(private httpClient: HttpClient) { }

  
  authUser(signUsers: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.api.baseUrl}/login`, signUsers)
      .pipe(
        map(userData => {
          console.log('userdata', userData);
          if (userData.success) {
            sessionStorage.setItem('username', userData.data.userName);
            sessionStorage.setItem('presentacion', userData.data.presentacion);
            sessionStorage.setItem('userId', userData.data.userId);
            sessionStorage.setItem('rolUsuario', userData.data.rolUsuario);
            this.tokeString = 'Bearer ' + userData.data.accessToken;
            sessionStorage.setItem('tokenAuth', btoa(this.tokeString));
            sessionStorage.setItem('authData', btoa(JSON.stringify(userData.data)));
            sessionStorage.setItem('unidadOrganica', userData.data.unidadOrganica);
            sessionStorage.setItem('unidadOrganicaId', userData.data.unidadOrganicaId);
            sessionStorage.setItem('subUnidadOrganica', userData.data.subUnidadOrganica);
            sessionStorage.setItem('subUnidadOrganicaId', userData.data.subUnidadOrganicaId);
          }
          return userData;
        })
      );
  }

/*   recoveryPassword(user: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.api.baseUrl}/v1/accounts/recovery/password`, user)
      .pipe(
        map(userData => {
          return userData;
        })
      );
  }
 */
  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authData');
    sessionStorage.removeItem('token');
  }

  getIsAuthenticated(): boolean {
    const user = sessionStorage.getItem('username');
    if (user != null) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  /* getIsActivate(): boolean {
    const jsonValue = sessionStorage.getItem('authData');
    if (jsonValue != null) {
      const user = JSON.parse(atob(sessionStorage.getItem('authData')));
      if (user != null) {
        return user.activaCuenta;
      }
    }
    return false;
  } */
}
