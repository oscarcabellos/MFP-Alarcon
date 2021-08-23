// Importacion de librerias y componentes
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { ExcelService } from '../../servicios/excel.service';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css'],
})
// Declaracion de la clase ListarCursoComponent
export class ListaCursoComponent implements OnInit {
  // Declaracion de variables
  cursos: Curso[];
  usuarioId: number;
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean;
  nombreFiltro: string;
  // Declaracion del constructor
  constructor(
    private readonly cursoService: CursoService,
    private readonly excelServices: ExcelService,
    private readonly modalService: NgbModal
  ) {}
  // Función que se ejecuta cuando inicializa la clase
  ngOnInit(): void {
    this.pageActual = 1;
    this.responsive = true;
    this.nombreFiltro = '';
    this.usuarioId = +sessionStorage.getItem('usuario_id');
    this.listarCursos(this.usuarioId);
  }

  /**
   * Función para unirse a un curso a partir del codigo
   */
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

  /**
   * Función para listar los cursos por usuario
   * @param id {Number} - Identificador del usuario
   */
  listarCursos(id: number) {
    this.cursoService.listarCursosPorUsuario(id).subscribe((x) => {
      this.cursos = x['list'];
      this.listarCursos2(id);
    });
  }

  /**
   * Función para la busqueda de los cursos de un usuario
   * @param id {Number} - Identificador del usuario
   */
  listarCursos2(id: number) {
    this.cursoService.listarCursosPorUsuario2(id).subscribe((x) => {
      this.cursos = this.cursos.concat(x['data']);
    });
  }

  /**
   * Función para reiniciar el numero de página
   */
  cambiarPagina() {
    this.pageActual = 1;
  }

  /**
   * Función para descargar el listado de alumnos
   * @param id {Number} - Identificador del curso
   */
  descargarlista(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      if (x['data'][0]?.length > 0) {
        this.excelServices.exportAsExcelFile(x.data[0], 'ListaCurso');
      } else {
        Swal.fire({
          title: 'Lista de alumnos vacia',
          text: `No se puede descargar un excel sin alumnos en el curso`,
          icon: 'error',
          confirmButtonColor: '#2F6DF2',
        });
      }
    });
  }

  editarCurso(curso: Curso) {
    const modalRef = this.modalService.open(EditarCursoComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      curso: curso,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        // Intencional
      },
      (reason) => {
        // Intencional
      }
    );
  }

  mostrarCodigo(curso: Curso) {
    Swal.fire(`El código del curso es: ${curso?.codigo}`);
  }
}
