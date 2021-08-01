import { Injectable } from '@angular/core';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Injectable({
  providedIn: 'root',
})
export class NewUsuarioService extends AppServiceBase {
  /**
   * Servicio para editar la información de un usuario
   * @param usuarioNuevo Objeto con la información del usuario
   * @returns Objeto con el usuario
   */
  editarUsuario(usuarioNuevo: any) {
    const usuario_id = sessionStorage.getItem('usuario_id');
    return this.post(`useredit/${usuario_id}`, usuarioNuevo);
  }
}
