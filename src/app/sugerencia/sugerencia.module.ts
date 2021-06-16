import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SugerenciaRoutingModule } from './sugerencia-routing.module';
import { ListarSugerenciasComponent } from './components/listar-sugerencias/listar-sugerencias.component';

@NgModule({
  declarations: [ListarSugerenciasComponent],
  imports: [CommonModule, SugerenciaRoutingModule],
})
export class SugerenciaModule {}
