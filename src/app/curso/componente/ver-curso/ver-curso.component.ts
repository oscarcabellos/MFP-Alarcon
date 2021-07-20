import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../modelo/curso';
import { Usuario } from '../../modelo/usuario';
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
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.cursos = [];
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
      this.obtenerUsuario(x['data']['usuario_id']);
      this.listarCursos(x['data']['usuario_id']);
    });
  }

  obtenerUsuario(id: number) {
    this.usuarioService
      .obtenerUsuario(id)
      .subscribe((x) => (this.usuario = x['user'][0]));
  }

  listarCursos(id: number) {
    this.cursoService.listarCursosPublicosPorUsuario(id).subscribe((x) => {
      if (x['cursos']?.length > 3) {
        this.cursos = [];
        this.cursos.push(x['cursos'][0]);
        this.cursos.push(x['cursos'][1]);
        this.cursos.push(x['cursos'][2]);
      } else {
        this.cursos = x['cursos'];
      }
    });
  }

  verCurso(id: number) {
    this.router.navigate([`cursos/curso/vista/${id}`]).then(() => {
      window.location.reload();
    });
  }

  unirCurso(id: number) {
    if (sessionStorage.getItem('correo') != null) {
      console.log(id, sessionStorage.getItem('correo'));
      this.cursoService
        .agrearUsuarioCurso(id, sessionStorage.getItem('correo'))
        .subscribe((x) => {
          console.log(x);
        });
    }
  }
}
