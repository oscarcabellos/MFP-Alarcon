import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  listarcursos() {}

  cursos = [
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
  ];
}
