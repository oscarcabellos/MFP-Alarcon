import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService extends AppServiceBase {
  listarCursosPublicos(): Observable<any> {
    return this.get('coursespublic').pipe();
  }
}
