import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent implements OnInit {
  notificaciones = [1, 2, 3, 4, 5];

  constructor() {
    // Codigo de inicializacion del componente
  }

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }
}
