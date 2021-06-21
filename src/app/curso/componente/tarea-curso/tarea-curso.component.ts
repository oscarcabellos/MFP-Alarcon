import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarea-curso',
  templateUrl: './tarea-curso.component.html',
  styleUrls: ['./tarea-curso.component.css'],
})
export class TareaCursoComponent implements OnInit {
  constructor() {}

  tareas = [1, 2, 3, 4, 5];
  ngOnInit(): void {}
  entregar(id: number) {
    alert('Entregado ' + id);
  }
}
