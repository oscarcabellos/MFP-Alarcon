/*Datos principales del componente de la aplicacion*/

/**Importaciones generales correspondiente al componente App**/
/*Importacion general del componente principal de modulos de angular*/
import { Component } from '@angular/core';

/* Elementos del componente para definir sus rutas especificas de valores */
@Component({
  /* Nombre del selector para el componente */
  selector: 'app-root',
  /* Direccion del modelo HTML del componente */
  templateUrl: './app.component.html',
  /* Direccion de los estilos CSS del componente */
  styleUrls: ['./app.component.css']
})
/* Se exporta la clase como AppComponent */
export class AppComponent {
  /*El titulo de la exportacion principal se define en este apartado*/
  title = 'aula-virtual';
}
