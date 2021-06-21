import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css'],
})
export class VerCursoComponent implements OnInit {
  curso: Curso;
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.listarCurso(id);
  }

  listarCurso(id: number) {
    this.cursoService
      .obtenerCurso(id)
      .subscribe((x) => (this.curso = x['data']));
  }
}
