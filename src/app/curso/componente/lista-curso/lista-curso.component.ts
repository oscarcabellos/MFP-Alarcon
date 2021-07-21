import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { ExcelService } from '../../servicios/ExcelService';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css'],
})
export class ListaCursoComponent implements OnInit {
  cursos: Curso[];
  usuarioId: number;
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  //filtro de cursos
  nombreFiltro: string = '';

  constructor(
    private cursoService: CursoService,
    private excelServices: ExcelService
  ) {}
  //constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.pageActual = 1;

    this.usuarioId = +sessionStorage.getItem('usuario_id');
    this.listarCursos(this.usuarioId);
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
      console.log(x);

      this.cursos = x['list'];
      this.listarCursos2(id);
      console.log(x);
    });
  }

  listarCursos2(id: number) {
    this.cursoService.listarCursosPorUsuario2(id).subscribe((x) => {
      this.cursos = this.cursos.concat(x['data']);
      console.log(x);
    });
  }

  cambiarPagina() {
    this.pageActual = 1;
  }

  descargarlista(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      console.log(x);

      this.excelServices.exportAsExcelFile(x.data, 'ListaCurso');
    });
  }
}
