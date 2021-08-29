import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Sugerencia } from '../modelos/sugerencia';
import { Voto } from '../modelos/voto';

@Injectable({
  providedIn: 'root',
})
export class SugerenciaService extends AppServiceBase {
  /**
   * Servicio para listar todas las sugerencias creadas
   * @returns Listado de las sugerencias
   */
  listarSugerencias(): Observable<any> {
    return this.get('suggestions').pipe(catchError(this.handleError));
  }

  listarSugerenciasVotos(): Observable<any> {
    return this.get('listarSugerenciasVotos').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio para crear un nueva sugerencia
   * @param sugerencia {Sugerencia} - Objeto con la informacion de la sugerencia
   * @returns Sugerencia creada
   */
  crearSugerencia(sugerencia: Sugerencia): Observable<any> {
    return this.post('suggestions', sugerencia).pipe(
      catchError(this.handleError)
    );
  }
  votarSugerencia(sugerencia: Voto): Observable<any> {
    return this.post('votarSugerencias', sugerencia).pipe(
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
