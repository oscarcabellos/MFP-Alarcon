import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  curso: Curso=new Curso();

  constructor(
    cursoService: CursoService
  ) { }

  ngOnInit(): void {
  }
  
  
  obtenerPrivacidad(x: number){
    if(x==1){
      this.curso.privacidad="1"; //publico
    }else{
      this.curso.privacidad="0"; //privado
    }
  }

  crearCurso(){
    console.log("curso: ", this.curso);
    
  }

}
