/*Datos principales de los modulos del componente de la aplicacion*/

/***Importaciones generales correspondiente a los modulos del componente App***/
/**Importacion general del componente principal de modulos de angular**/
/*Importacion de modulos comunes de la biblioteca comun de angular*/
import { CommonModule } from '@angular/common';
/*Importacion de modulos http de la biblioteca comun de angular*/
import { HttpClientModule } from '@angular/common/http';
/*Importacion de el modulo principal de angular de la biblioteca de modulos de angular*/
import { NgModule } from '@angular/core';
/*Importacion del modulo de buscador de la biblioteca de plataforma de buscadores de angular*/
import { BrowserModule } from '@angular/platform-browser';
/*Importacion del modulo de rutas de la biblioteca de rutas de angular*/
import { RouterModule } from '@angular/router';
/*Importacion del modulo AppRoutingModule de su direccion respectiva*/
import { AppRoutingModule } from './app-routing.module';

/**Importaciones generales de otros componentes**/
/*Importacion del componente AppComponent de su respectiva ruta*/
import { AppComponent } from './app.component';
/*Importacion del componente Homecomponent de su respectiva ruta*/
import { HomeComponent } from './home/components/home/home.component';
/*Importacion del componente Footercomponent de su respectiva ruta*/
import { FooterComponent } from './layout/components/footer/footer.component';
/*Importacion del componente HeaderComponent de su respectiva ruta*/
import { HeaderComponent } from './layout/components/header/header.component';
/*Importacion del modulo de angular de la biblioteca de estilos del framework bootstrap*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*Importacion del componente de formularios de la biblioteca de formularios de angular*/
import { FormsModule } from '@angular/forms';

/*Modulo principal del componente basado en angular*/
@NgModule({
  /*Declaraciones del componente que coloca en un array a los componentes importados*/
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent],
  /*Importaciones de las funciones de las funciones obtenidas de la biblioteca angular*/ 
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  /*Array de proovedores vacio*/
  providers: [],
  /*Elemento del bootstrap definido en una funcion correspondiente a su importacion*/
  bootstrap: [AppComponent],
})
/*Exportacion de la clase como AppModule*/
export class AppModule {}
