/* Servicio que apoya al componente perfil en caso de editar los datos del usuario */

/* Importaciones principales del servicio */
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

  /* Metodo para editar el usuario, se exporta hacia el ts del perfil (profile) */
  editarUsuario(formData: FormData) {
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    /* Se iguala una constante al id del usuario logueado */
    const usuario_id = sessionStorage.getItem('usuario_id');
    /* Se retorna dicho valor al usuario en cuestion */
    return this.post(`useredit/${usuario_id}`, object);
  }
}
