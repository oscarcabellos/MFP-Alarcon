import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';



@NgModule({
  declarations: [
    CursoRoutingModule
  ],
  imports: [
    CommonModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
