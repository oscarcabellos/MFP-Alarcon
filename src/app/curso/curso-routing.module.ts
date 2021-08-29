import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPublicoComponent } from './componente/curso-publico/curso-publico.component';
import { CursoComponent } from './componente/curso/curso.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { VerCursoComponent } from './componente/ver-curso/ver-curso.component';

//variable array contastante para agregar cada ruta y el componente que correnponda 
const routes: Routes = [
  //ruta por defecto
  {
    path: '',
    component: CursoPublicoComponent,
  },
  //visualizacion del bashboard de cursos
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  //visualizacion para visulaizar un curso en especifico
  {
    path: 'curso/vista/:id',
    component: VerCursoComponent,
  },
  //visualizacion para ver los cursos
  {
    path: 'curso/:iduser/:idcurso',
    component: CursoComponent,
  },
];

@NgModule({
  //Otros módulos cuyas clases exportadas son necesarias para las plantillas de componentes declaradas en este NgModule.
  imports: [RouterModule.forChild(routes),HttpClientModule],
  //El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
  exports: [RouterModule],
})
//El subconjunto de declaraciones que deberían ser visibles y utilizables en las plantillas de componentes de otros NgModules.
export class CursoRoutingModule {}
