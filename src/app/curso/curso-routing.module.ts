import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCursoComponent } from './componente/crear-curso/crear-curso.component';
import { CursoPublicoComponent } from './componente/curso-publico/curso-publico.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { VerCursoComponent } from './componente/ver-curso/ver-curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursoPublicoComponent,
  },
  {
    path: 'crear',
    component: CrearCursoComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'curso/:id',
    component: VerCursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoRoutingModule {}
