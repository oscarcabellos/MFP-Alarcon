import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  cursos: Curso[];
  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      this.cursos = x['list'];
    });
  }
}
