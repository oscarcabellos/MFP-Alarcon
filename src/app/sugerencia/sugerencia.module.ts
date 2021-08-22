import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSugerenciaComponent } from './componentes/lista-sugerencia/lista-sugerencia.component';
import { SugerenciaRoutingModule } from './sugerencia-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NuevaSugerenciaComponent } from './componentes/nueva-sugerencia/nueva-sugerencia.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListaSugerenciaComponent, NuevaSugerenciaComponent],
  imports: [
    CommonModule,
    SugerenciaRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
})
export class SugerenciaModule {}
