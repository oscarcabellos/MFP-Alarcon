/**
 * Se importa los modulos de angular
 */
import { Component, OnInit } from '@angular/core';
/**
 * Se importa el modulo de manejo de rutas
 */
import { Router } from '@angular/router';

/**
 * Se listan las referencias hacia las dependencias del componente
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * Se crea la clase para el componente header
 */
export class HeaderComponent implements OnInit {
  /**
   * Variable para definir si el usuario se ha registro
   */
  usuarioRegistrado: boolean;
  /**
   * variable para almacenar la información del usuario
   */
  usuario: string;
  /**
   * variable para almacenar la imagen del usuario
   */
  imagen: string;
  /**
   * Constructor para el componente header
   * @param router dependencia para el manejo de rutas
   */
  constructor(private readonly router: Router) {}

  /**
   * Función que se ejecuta al momento de crear el componente
   */
  ngOnInit(): void {
    /**
     * Se valida que el usuario se ha registrado
     */
    if (+sessionStorage.getItem('usuario_id') !== 0) {
      /**
       * se almacena el valor true
       */
      this.usuarioRegistrado = true;
      /**
       * Se alamcena el nombre del usuario
       */
      this.usuario = sessionStorage.getItem('usuario_nombre');
      /**
       * Se almacena la url de la imagen
       */
      this.imagen = sessionStorage.getItem('url');
    } else {
      /**
       * Se alamcena el valor false
       */
      this.usuarioRegistrado = false;
    }
  }

  /**
   * Función para cerrar sesión
   */
  logout() {
    /**
     * Se elimina el identificador del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_id');
    /**
     * Se elimina el apellido del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_apellidos');
    /**
     * Se elimina el nombre del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_nombre');
    /**
     * Se elimina el correo del usuario de las variables de sesión
     */
    sessionStorage.removeItem('correo');
    /**
     * Se elimina la url de la imagen del usuario de las variables de sesión
     */
    sessionStorage.removeItem('url');
    /**
     * Se cambia a otra ruta de la pagina
     */
    this.router.navigate(['user/login']).then(() => {
      window.location.reload();
    });
  }
}
