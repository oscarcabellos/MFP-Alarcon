import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { CloudBinaryService } from '../../../services/cloud-binary.service';
import { Data } from '../../../services/dataModel';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  curso: Curso = new Curso();
  image: any[];
  data: Data;
  constructor(
    private cursoService: CursoService,
    private http: HttpClient,
    private cloudBinaryService: CloudBinaryService
  ) {}

  ngOnInit(): void {}
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
    console.log(this.image);

    if (this.image != null && this.image != undefined) {
      this.cloudBinaryService
        .sendPhoto(this.image[0])
        .subscribe((response: Data) => {
          this.curso.imagen = response['secure_url'];
          console.log(response);
          this.curso.usuario_id = 25;
          this.curso.categoria_id = 1;

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
      this.curso.usuario_id = 25;
      this.curso.categoria_id = 1;

      this.cursoService.crearCurso(this.curso).subscribe(() => {
        Swal.fire({
          title: 'Curso creado',
          text: `El curso se ha creado con exito`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
        });
      });
    }
  }
}
