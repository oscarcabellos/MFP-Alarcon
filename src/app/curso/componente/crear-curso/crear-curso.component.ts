import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  curso: Curso=new Curso();

  constructor() { }

  ngOnInit(): void {
  }
  
  
  obtenerPrivacidad(x: number){
    if(x==1){
      this.curso.privacidad="PUBLICO";
    }else{
      this.curso.privacidad="PRIVADO";
    }
  }

  crearCurso(){
    console.log("curso: ", this.curso);
    
  }

}
