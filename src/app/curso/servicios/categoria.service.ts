import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends AppServiceBase {
  /**
   * Servicio para listar todas las categorias
   * @returns Listado de categorias
   */
  listarCategorias(): Observable<any> {
    return this.get(`categories`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para buscar una categoria a partir de su id
   * @param id {Number} - Identificador de la categoria
   * @returns Objeto con la informacion de una categoria
   */
  getCategoria(id: number): Observable<any> {
    return this.get(`categories/${id}`).pipe(catchError(this.handleError));
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
