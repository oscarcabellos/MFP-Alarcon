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
  /**
   * Servicio para crear una nueva tarea
   * @param tarea {Tarea} - Objeto con la información de la tarea
   * @returns Objeto creado
   */
  crearTarea(tarea: Tarea): Observable<any> {
    return this.post(``, tarea).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para listar las tareas creadas en un curso
   * @param id {Number} - Identificador del curso
   * @returns Listado con las tareas del curso
   */
  listarTareaCurso(id: number): Observable<any> {
    return this.get(`listarTareasCurso/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio para actualizar la informacion de una tarea
   * @param id Identificador de la tarea
   * @param tarea Objeto con la información de la tarea
   * @returns Mensaje de confirmación
   */
  actualizarTarea(id: number, tarea: Tarea) {
    return this.put(`editarTarea/${id}`, tarea).pipe(
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
