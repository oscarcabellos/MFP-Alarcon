import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelo/usuario';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends AppServiceBase {
  obtenerUsuario(id: number) {
    return this.get(`users/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    return throwError('Cannot perform the request, please try again later');
  }
}
