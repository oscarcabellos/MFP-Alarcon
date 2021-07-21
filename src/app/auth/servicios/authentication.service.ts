import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;

  constructor(private httpClient: HttpClient) {}

  authUser(signUsers: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.api.baseUrl}login`, signUsers)
      .pipe(
        map((userData) => {
          sessionStorage.setItem('usuario_id', userData.user.usuario_id);
          sessionStorage.setItem(
            'usuario_apellidos',
            userData.user.usuario_apellidos
          );
          sessionStorage.setItem(
            'usuario_nombre',
            userData.user.usuario_nombre
          );
          sessionStorage.setItem('correo', userData.user.correo);
          sessionStorage.setItem('imagen', userData.user.url);

          return userData;
        })
      );
  }

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
}
