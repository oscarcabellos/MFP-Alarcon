import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSugerenciaComponent } from './componentes/lista-sugerencia/lista-sugerencia.component';

const routes: Routes = [{ path: '', component: ListaSugerenciaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciaRoutingModule {}
