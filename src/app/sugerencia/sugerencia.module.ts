import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSugerenciaComponent } from './componentes/lista-sugerencia/lista-sugerencia.component';
import { SugerenciaRoutingModule } from './sugerencia-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NuevaSugerenciaComponent } from './componentes/nueva-sugerencia/nueva-sugerencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


/* es una función que toma un solo objeto de metadatos, cuyas propiedades describen el módulo */
@NgModule({
  /* Los componentes, directivas y canalizaciones que pertenecen a este NgModule. */
  declarations: [ListaSugerenciaComponent, NuevaSugerenciaComponent],
   /* Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declaradas en este NgModule. */
  imports: [
    CommonModule,
    //modulo para hacer sugerencia para la obtencion de datos.
    SugerenciaRoutingModule,
    //modulo para paginar las listas
    NgxPaginationModule,
    //Utilizacion de routing del curso
    HttpClientModule,
    //modulo para utilizar el ngModule y obtener los datos
    FormsModule,
    //modulo para la utilizacion del filter
    SharedModule,
    //modulo para hacer formularios reactivos y utilizar formControlName para la obtencion de datos.
    ReactiveFormsModule,
    NgbModule,
  ],
})

/* El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules. */
export class SugerenciaModule {}
