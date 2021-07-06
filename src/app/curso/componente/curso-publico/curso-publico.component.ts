import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  //paginacion de cursos
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  //filtro de cursos
  cursoFilter: string = '';

  cursos: Curso[];
  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      this.cursos = x['cursos'];
    });
  }
  borrarBusqueda() {
    this.cursoFilter = '';
  }
}
