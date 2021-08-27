/**
 * Se importa las funciones de angular para poder incializar el componente
 */
import { Component, OnInit } from '@angular/core';

/**
 * Se importa el modulo de rutas para poder realizar el manejo a otras secciones
 */
import { Router } from '@angular/router';

/**
 * Se declara las variables que corresponden al componente
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

/**
 * Se crea la clase del componente dashboard con la implementación de la interface oninit
 */
export class DashboardComponent implements OnInit {
  /**
   * Variable para determinar si se accede para editar o para crear
   */
  editar = false;

  /**
   * Constructor para incializar los modulos que se van a utilizar dentro del componente
   * @param router Modulo para el manejo de las rutas dentro de la página
   */
  constructor(private readonly router: Router) {}

  /**
   * Función que incializa las variables y hace llamadas a funciones
   */
  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }

  /**
   * Función para cerrar sesión y redirigir hacia el componente de login
   */
  logout() {
    /**
     * Se elimina el identificador del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_id');

    /**
     * Se elimina los apellidos del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_apellidos');

    /**
     * Se elimina el nombre del usuario de las variables de sesión
     */
    sessionStorage.removeItem('usuario_nombre');

    /**
     * Se elimina el correo del usuario de las variable de sesión
     */
    sessionStorage.removeItem('correo');

    /**
     * Se elimina la url de la imagen de las variables de sesión
     */
    sessionStorage.removeItem('url');

    /**
     * Se hace una redirección hacia la ruta correspondiente del login
     */
    this.router.navigate(['user/login']).then(() => {
      /**
       * Se recarga la pagina una vez que se ha navegado hacia el login
       */
      window.location.reload();
    });
  }
}
