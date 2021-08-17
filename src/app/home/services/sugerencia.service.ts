import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class SugerenciaService extends AppServiceBase {
  /**
   * Servicio para listar las sugerencias con mayor cantidad de votos
   * @returns Lista con las sugerencias con mas votos
   */
  listarSugerencias(): Observable<any> {
    return this.get('listarSugerenciasMasVotos').pipe(
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
