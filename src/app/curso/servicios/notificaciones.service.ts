import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Curso } from '../modelo/curso';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService extends AppServiceBase {
  listarCursosPublicos(): Observable<any> {
    return this.get('coursespublic').pipe();
  }
}
