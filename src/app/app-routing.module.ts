/*Datos principales del componenete perfil*/

/**Importaciones principales del componente**/
/*Importacion de las principales modulos de angular*/
import { NgModule } from '@angular/core';
/*Importacion del modulo Router y sus respectivas variaciones*/
import { RouterModule, Routes } from '@angular/router';
/*Importacion del componente hogar desde su respectiva ubicacion*/
import { HomeComponent } from './home/components/home/home.component';

/**Constante que simula las rutas de la aplicacion dentro del proyecto**/
/*Para esto, se usan datos tipo json especificos en la composicion*/
const routes: Routes = [
  /*Json que define la ruta del componente hogar como un String vacio*/
  {
    path: '',
    component: HomeComponent,
  },
  /*Json que define la ruta del componente de modulo de cursos con la terminacion "cursos"*/
  {
    path: 'cursos',
    loadChildren: () =>
      import('./curso/curso.module').then((m) => m.CursoModule),
  },
  /*Json que define la ruta del componente de modulo de sugerencias con la terminacion "sugerencias"*/
  {
    path: 'sugerencias',
    loadChildren: () =>
      import('./sugerencia/sugerencia.module').then((m) => m.SugerenciaModule),
  },
  /*Json que define la ruta del componente de modulo de usuarios con la terminacion "user"*/
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  /*Json que define la ruta del componente de modulo total a una redireccion vacia*/
  {
    path: '**',
    redirectTo: '',
  },
];
/**Moodulo de angular definido para optimizar las exportaciones**/
@NgModule({
  /* Las declaraciones son un array vacio */
  declarations: [],
  /* Las importaciones contienen el modulo de ruta de las importaciones para definir correctamente las rutas
  establecidas anteriormente*/
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  /* La exportacion definida contiene el elemento */
  exports: [RouterModule],
})
/* Se exporta la clase como AppRoutingModule */
export class AppRoutingModule {}
