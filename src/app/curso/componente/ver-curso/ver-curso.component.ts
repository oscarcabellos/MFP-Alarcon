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
    if (+sessionStorage.getItem('usuario_id') != 0) {
      this.usuarioNoRegistrado = false;
    } else {
      this.usuarioNoRegistrado = true;
    }
  }

  listarCurso(id: number) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
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

  obtenerUsuario(id: number) {
    this.usuarioService
      .obtenerUsuario(id)
      .subscribe((x) => (this.usuario = x['user'][0]));
  }

  listarCursos(id: number, cursoId: number) {
    this.cursoService.listarCursosPublicosPorUsuario(id).subscribe((x) => {
      this.cursos = x['cursos'];
      this.cursos = this.cursos.filter((c) => c.curso_id !== cursoId);
      if (this.cursos?.length > 3) {
        this.cursos = [this.cursos[0], this.cursos[1], this.cursos[2]];
      }
    });
  }

  verCurso(id: number) {
    this.router.navigate([`cursos/curso/vista/${id}`]).then(() => {
      window.location.reload();
    });
  }

  unirCurso(id: number, idPrivacidad: number) {
    if (sessionStorage.getItem('correo') != null) {
      if (idPrivacidad === CURSO_PUBLICO) {
        this.cursoService
          .agrearUsuarioCurso(id, sessionStorage.getItem('correo'))
          .subscribe((x) => {
            console.log('dsvaadv', x);
            Swal.fire({
              title: 'Se unió al curso',
              icon: 'success',
              showConfirmButton: false,
              width: '20rem',
              timer: 1500,
            });
          });
      } else if (idPrivacidad === CURSO_CON_INVITACION) {
        this.cursoService
          .solicitarAcceso(id, +sessionStorage.getItem('usuario_id'))
          .subscribe((x) => console.log(x));
      }
    }
  }

  buscarCategoria(id: number) {
    this.categoriaService.getCategoria(id).subscribe((x) => {
      this.categoria = x['categories'][0];
    });
  }

  listarCursoUsuario(id: number, idCurso: number) {
    this.cursoService.listarCursosPorUsuario2(id).subscribe((x) => {
      this.esAlumnoCurso =
        x['data'].find((c) => c?.curso_id === idCurso) !== 'undefined';
    });
  }
}
