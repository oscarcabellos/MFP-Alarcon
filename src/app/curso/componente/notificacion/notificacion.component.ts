import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../servicios/notificaciones.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent implements OnInit {
  //  Variables del componente ts
  notificaciones;

  constructor(public notificacionService: NotificacionService) {
    // Codigo de inicializacion del componente
  }

  ngOnInit(): void {
    // Codigo de inicializacion del componente
    this.notificacionService.listarCursosPublicos().subscribe((x) => {
      this.notificaciones = x.cursos;
    });
  }
}
