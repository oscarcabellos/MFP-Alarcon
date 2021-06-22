import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { AgregarUsuarioComponent } from './componente/agregar-usuario/agregar-usuario.component';
import { CrearCursoComponent } from './componente/crear-curso/crear-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoPublicoComponent } from './componente/curso-publico/curso-publico.component';
import { VerCursoComponent } from './componente/ver-curso/ver-curso.component';
import { CursoComponent } from './componente/curso/curso.component';
import { TareaCursoComponent } from './componente/tarea-curso/tarea-curso.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipe/filter.pipe';
import { DashboardComponent } from './componente/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AgregarUsuarioComponent,
    CrearCursoComponent,
    CursoComponent,
    CursoPublicoComponent,
    TareaCursoComponent,
    VerCursoComponent,
    FilterPipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CursoRoutingModule,
    NgxPaginationModule,
  ],
})
export class CursoModule {}
