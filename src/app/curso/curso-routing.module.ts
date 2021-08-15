import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPublicoComponent } from './componente/curso-publico/curso-publico.component';
import { CursoComponent } from './componente/curso/curso.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { VerCursoComponent } from './componente/ver-curso/ver-curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursoPublicoComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'curso/vista/:id',
    component: VerCursoComponent,
  },
  {
    path: 'curso/:iduser/:idcurso',
    component: CursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
})
export class CursoRoutingModule {}
