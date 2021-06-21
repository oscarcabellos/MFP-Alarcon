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

  /* [
    {
      nombre: 'nombre',
      imagen:
        'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png',
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit tempora minima rem obcaecati sequi rerum reprehenderit omnis a odio.',
      profesor: 'profesor',
    },
    {
      nombre: 'nombre',
      imagen:
        'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png',
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit tempora minima rem obcaecati sequi rerum reprehenderit omnis a odio.',
      profesor: 'profesor',
    },
    {
      nombre: 'nombre',
      imagen:
        'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png',
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit tempora minima rem obcaecati sequi rerum reprehenderit omnis a odio.',
      profesor: 'profesor',
    },
    {
      nombre: 'nombre',
      imagen:
        'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png',
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit tempora minima rem obcaecati sequi rerum reprehenderit omnis a odio.',
      profesor: 'profesor',
    },
    {
      nombre: 'nombre',
      imagen:
        'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png',
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit tempora minima rem obcaecati sequi rerum reprehenderit omnis a odio.',
      profesor: 'profesor',
    },
  ]; */

  listarCursos() {
    this.cursoService
      .listarCursosPublicos()
      .subscribe((x) => (this.cursos = x['list']));
  }
}
