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
  listaCursos = [1, 2, 3];
  cursos: Curso[];
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
    this.listarCursos();
  }

  listarCurso(id: number) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      this.curso = x['data'];
      this.obtenerUsuario(x['data']['usuario_id']);
    });
  }

  obtenerUsuario(id: number) {
    this.usuarioService
      .obtenerUsuario(id)
      .subscribe((x) => (this.usuario = x['user'][0]));
  }

  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      for (let i = 1; i <= 3; i++) {
        this.cursos.push(x['list'][i]);
      }
    });
  }

  verCurso(id: number) {
    this.router.navigate([`cursos/curso/${id}`]).then(() => {
      window.location.reload();
    });
  }
}
