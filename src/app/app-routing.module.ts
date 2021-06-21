import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCursoComponent } from './curso/componente/crear-curso/crear-curso.component';
import { CursoPublicoComponent } from './curso/componente/curso-publico/curso-publico.component';
import { HomeComponent } from './home/components/home/home.component';
import { ListarSugerenciasComponent } from './sugerencia/components/listar-sugerencias/listar-sugerencias.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./curso/curso.module').then((m) => m.CursoModule),
  },
  {
    path: 'sugerencias',
    component: ListarSugerenciasComponent,
  },
  {
    path: 'login',
    loadChildren: () => 
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
