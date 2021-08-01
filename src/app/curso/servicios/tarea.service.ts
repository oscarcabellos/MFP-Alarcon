import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Tarea } from '../modelo/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService extends AppServiceBase {
  crearTarea(tarea: Tarea): Observable<any> {
    return this.post(``, tarea).pipe(catchError(this.handleError));
  }

  listarTareaCurso(id: number): Observable<any> {
    return this.get(`list-task/${id}`).pipe(catchError(this.handleError));
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
