import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Curso } from '../modelo/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends AppServiceBase {

  crearCurso(curso: Curso): Observable<any> {
    return this.post(`/v1/sugerencia/create/sugerencia`, curso)
      .pipe(
        map((response: any) => response.sugerencia as Curso),
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
