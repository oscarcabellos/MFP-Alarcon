import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Curso } from '../modelo/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends AppServiceBase {
  /**
   * Servicio para crear un nuevo curso
   * @param curso {Curso} - Objeto con el contenido del curso para crear
   * @returns Objeto creado
   */
  crearCurso(curso: Curso): Observable<any> {
    return this.post(`courses`, curso).pipe(
      map((response: any) => response.curso as Curso),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Servicio para listar los cursos que son publicos
   * @returns Lista de cursos publicos
   */
  listarCursosPublicos(): Observable<any> {
    return this.get('coursespublic').pipe(catchError(this.handleError));
  }

  /**
   * Servicio para buscar un curso por su id
   * @param id {Number} - Identificador del curso para buscar
   * @returns Datos del curso
   */
  obtenerCurso(id: number): Observable<any> {
    return this.get(`courses/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para listar a los usuarios registrados en un curso
   * @param id {Number} - Identificador del curso para buscar
   * @returns Listado de usarios que pertenecen al curso
   */
  listarUsuariosPorCurso(id: number): Observable<any> {
    return this.get(`course-user/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para listar los cursos que pertenecen a un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos por usuario
   */
  listarCursosPorUsuario(id: number): Observable<any> {
    return this.get(`cursos/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para listar los cursos de un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos por usuario
   */
  listarCursosPorUsuario2(id: number): Observable<any> {
    return this.get(`coursesofuser/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para agregar un usuario a un curso
   * @param idCurso {Number} - Identificador del curso
   * @param correo {String} - Correo del usuario para agregar
   * @returns Mensaje de confirmación
   */
  agrearUsuarioCurso(idCurso: number, correo: string): Observable<any> {
    return this.post('coursesUsers', { curso_id: idCurso, correo }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio para listar los curos públicos que pertenecen a un usuario
   * @param id {Number} - Identificador del usuario
   * @returns Listado de cursos publicos de un usuario
   */
  listarCursosPublicosPorUsuario(id: number): Observable<any> {
    return this.get(`coursespublic/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para solicitar acceso a un curso
   * @param curso_id {Number} - Identificador del curso
   * @param usuario_id {Number} - Identificador del usuario
   * @returns Mensaje de confirmación
   */
  solicitarAcceso(curso_id, usuario_id): Observable<any> {
    return this.post('/solicitarCursoPrivado', { curso_id, usuario_id }).pipe(
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
