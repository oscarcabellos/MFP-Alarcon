import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CloudBinaryService } from '../../../services/cloud-binary.service';
import { Data } from '../../../services/dataModel';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  curso: Curso = new Curso();
  image: any;
  data: Data;
  constructor(
    private cloudBinaryService: CloudBinaryService,
  ) { }

  ngOnInit(): void {
  }
  obtenerPrivacidad(x: number){
    if(x==1){
      this.curso.privacidad="PUBLICO";
    }else{
      this.curso.privacidad="PRIVADO";
    }
  }

  onFileChange(event){
      this.image = event.target.files;
      console.log(this.image[0]);
  }

  crearCurso(){
    this.cloudBinaryService.sendPhoto(this.image[0])
      .subscribe((response: Data) => this.curso.imagen = response.secure_url)
    console.log("curso: ", this.curso);
  }
}
