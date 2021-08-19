import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class NuevoMaterialService extends AppServiceBase {
  crearTarea(tarea: any): Observable<any> {
      return this.post('creartarea', tarea);
  }
}