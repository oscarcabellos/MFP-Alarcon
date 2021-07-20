import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css'],
})
export class ListaCursoComponent implements OnInit {
  cursos: Curso[];
  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    let usuarioId = +sessionStorage.getItem('usuario_id');
    this.listarCursos(usuarioId);
  }

  unirseCurso() {
    Swal.fire({
      title: 'Ingrese el código del curso',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Unirse',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#18bc9c',
      preConfirm: (login) => {
        console.log(login);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  listarCursos(id: number) {
    this.cursoService.listarCursosPorUsuario(id).subscribe((x) => {
      this.cursos = x['list'];
    });
  }
}
