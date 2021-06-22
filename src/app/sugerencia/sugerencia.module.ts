import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSugerenciaComponent } from './componentes/lista-sugerencia/lista-sugerencia.component';
import { SugerenciaRoutingModule } from './sugerencia-touting.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NuevaSugerenciaComponent } from './componentes/nueva-sugerencia/nueva-sugerencia.component';

@NgModule({
  declarations: [ListaSugerenciaComponent, NuevaSugerenciaComponent],
  imports: [CommonModule, SugerenciaRoutingModule, NgxPaginationModule],
})
export class SugerenciaModule {}
