import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { CloudBinaryService } from '../../../services/cloud-binary.service';
import { Data } from '../../../services/dataModel';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  curso: Curso = new Curso();
  image: any[];
  data: Data;
  usuario_id: number;
  constructor(
    private cursoService: CursoService,
    private cloudBinaryService: CloudBinaryService
  ) { }

  ngOnInit(): void {
    this.usuario_id = +sessionStorage.getItem('usuario_id');
  }
  obtenerPrivacidad(x: number) {
    if (x == 1) {
      this.curso.privacidad_id = 1; //publico
    } else {
      this.curso.privacidad_id = 2; //privado
    }
  }

  onFileChange(event) {
    this.image = event.target.files;
    console.log(this.image[0]);
  }

  crearCurso() {
    this.curso.usuario_id = this.usuario_id;
    this.curso.categoria_id = 1;
    if (this.image != null || this.image != undefined) {
      this.cloudBinaryService
        .sendPhoto(this.image[0])
        .subscribe((response: Data) => {
          this.curso.imagen = response['secure_url'];
          
          this.cursoService.crearCurso(this.curso).subscribe(() => {
            Swal.fire({
              title: 'Curso creado',
              text: `El curso se ha creado con exito`,
              icon: 'success',
              confirmButtonColor: '#2F6DF2',
            });
          });
        });
    } else {
      this.cursoService.crearCurso(this.curso).subscribe(() => {
        Swal.fire({
          title: 'Curso creado',
          text: `El curso se ha creado con exito`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
        });
      });
    }
    this.curso=new Curso();
    
    $('#Privacidad').prop('checked', false);
  }
}
