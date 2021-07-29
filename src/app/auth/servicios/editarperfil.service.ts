import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { Usuario } from '../modelos/usuario';

@Injectable({
    providedIn: 'root',
  })
  export class NewUsuarioService extends AppServiceBase {
    editarUsuario(usuarioNuevo: any) {
        var usuario_id = sessionStorage.getItem("usuario_id");
        return this.post(`useredit/${usuario_id}`, usuarioNuevo);
    }
      
    
  }