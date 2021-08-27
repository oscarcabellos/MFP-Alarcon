import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Notificacion } from '../modelo/notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService extends AppServiceBase {
  listarCursosSolicitudAcceso(idUsuario: number): Observable<any> {
    return this.get(`listarCursosConSolicicitudAcceso/${idUsuario}`).pipe();
  }

  listarCursosSolicitudAccesoAlumnos(idUsuario: number): Observable<any> {
    return this.get(`listarCursosConSolicicitudAccesoParaAlumnos/${idUsuario}`).pipe();
  }

  aceptarInvitacion(notificacion: Notificacion): Observable<any> {
    return this.post('aceptarInvitacionDeProfesor', notificacion).pipe(
      catchError(this.handleError)
    );
  }
  darBloquearAccesoCurso(notificacion: Notificacion): Observable<any> {
    return this.post('aceptarSolicitudAcceso', notificacion).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Cannot perform the request, please try again later');
  }
}
