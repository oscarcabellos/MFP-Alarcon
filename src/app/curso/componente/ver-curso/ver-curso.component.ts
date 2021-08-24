import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CURSO_CON_INVITACION, CURSO_PUBLICO } from 'src/app/core/constants';
import Swal from 'sweetalert2';
import { Categoria } from '../../modelo/categoria';
import { Curso } from '../../modelo/curso';
import { Usuario } from '../../modelo/usuario';
import { CategoriaService } from '../../servicios/categoria.service';
import { CursoService } from '../../servicios/curso.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css'],
})
export class VerCursoComponent implements OnInit {
  curso: Curso;
  usuario: Usuario;
  cursos: Curso[];
  usuarioNoRegistrado: boolean;
  categoria: Categoria;
  esProfesorCurso: boolean;
  esAlumnoCurso: boolean;
  cantidadCursosPublicos: number;
  cantidadEstudiantes: number;
  alumnosMatriculados: number;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.cursos = [];
    this.esProfesorCurso = false;
    this.listarCurso(id);
    this.usuarioNoRegistrado = +sessionStorage.getItem('usuario_id') === 0;
  }

  /**
   * Función para obtener la información de un curso en particular
   * @param id Identificador del curso actual
   */
  listarCurso(id: number) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      console.log(x);

      this.alumnosMatriculados = x['alumnos'];
      this.curso = x['data'];
      this.esProfesorCurso =
        x['data']['usuario_id'] === +sessionStorage.getItem('usuario_id');
      this.obtenerUsuario(x['data']['usuario_id']);
      this.listarCursos(x['data']['usuario_id'], id);
      this.buscarCategoria(x['data']['categoria_id']);
      if (!this.usuarioNoRegistrado) {
        this.listarCursoUsuario(+sessionStorage.getItem('usuario_id'), id);
      }
    });
  }

  /**
   * Función para obtener la información de un usuario
   * @param id Identificador del usuario
   */
  obtenerUsuario(id: number) {
    this.usuarioService.obtenerUsuario(id).subscribe((x) => {
      this.usuario = x['user'][0];
      this.cantidadCursosPublicos = x['cantidadCursosPublicos'];
      this.cantidadEstudiantes = x['cantidadEstudiantes'];
      console.log(x);
    });
  }

  /**
   * Función para listar todos los cursos que creo de un usuario
   * @param id Identificador del usuario
   * @param cursoId Identificador del curso actual
   */
  listarCursos(id: number, cursoId: number) {
    this.cursoService.listarCursosPublicosPorUsuario(id).subscribe((x) => {
      this.cursos = x['cursos'];
      this.cursos = this.cursos.filter((c) => c.curso_id !== cursoId);
      if (this.cursos?.length > 3) {
        this.cursos = [this.cursos[0], this.cursos[1], this.cursos[2]];
      }
    });
  }

  /**
   * Función para ver la información de un curso
   * @param id Identificador del curso
   */
  verCurso(id: number) {
    this.router.navigate([`cursos/curso/vista/${id}`]).then(() => {
      window.location.reload();
    });
  }

  /**
   * Función para agregar un usuario a un curso
   * @param id Identificador del curso
   * @param idPrivacidad Identificador de privacidad del curso
   * @param usuarioId Identficador del profesor del curso
   */
  unirCurso(id: number, idPrivacidad: number, usuarioId: number) {
    if (sessionStorage.getItem('correo') != null) {
      if (idPrivacidad === CURSO_PUBLICO) {
        this.cursoService
          .unirCursoPublico(id, +sessionStorage.getItem('usuario_id'))
          .subscribe((x) => {
            Swal.fire({
              title: 'Se unió al curso',
              icon: 'success',
              showConfirmButton: false,
              width: '20rem',
              timer: 1000,
            }).then((x) => {
              this.router.navigate(['/cursos/curso', usuarioId, id]);
            });
          });
      } else if (idPrivacidad === CURSO_CON_INVITACION) {
        this.cursoService
          .solicitarAcceso(id, +sessionStorage.getItem('usuario_id'))
          .subscribe((x) => console.log(x));
      }
    }
  }

  /**
   * función para obtener la información de una categoria
   * @param id Identificador de la categoria
   */
  buscarCategoria(id: number) {
    this.categoriaService.getCategoria(id).subscribe((x) => {
      this.categoria = x['categories'][0];
    });
  }

  /**
   * Función para listar todos los cursos donde es alumno
   * @param id Identificador del usuario
   * @param idCurso Identificador del curso actual
   */
  listarCursoUsuario(id: number, idCurso: number) {
    this.cursoService.listarCursosPorUsuario2(id).subscribe((x) => {
      this.esAlumnoCurso =
        x['data'].find((c) => c?.curso_id === idCurso) !== undefined;
    });
  }
}
