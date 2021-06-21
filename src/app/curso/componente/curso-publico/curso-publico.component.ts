import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  cursos: Curso[];
  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      this.cursos = x['list'];
    });
  }
}
