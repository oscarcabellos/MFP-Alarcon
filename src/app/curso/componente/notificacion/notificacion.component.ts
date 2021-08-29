import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Notificacion } from '../../modelo/notificacion';
import { SolicitudAcceso } from '../../modelo/solicitudAcceso';
import { NotificacionService } from '../../servicios/notificaciones.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent implements OnInit {
  //  Variables del componente ts
  notificaciones: Notificacion[] = [];
  notificacion: Notificacion = new Notificacion();
  solicutdAcceso: SolicitudAcceso[] = [];
  solicutdAcceso2: SolicitudAcceso[] = [];

  idUsuario: number;
  constructor(public notificacionService: NotificacionService) {
    // Codigo de inicializacion del componente
  }

  ngOnInit(): void {
    /* this.notificacion.id_usuario */
    this.idUsuario = +sessionStorage.getItem('usuario_id');
    // Codigo de inicializacion del componente
    this.listarNotificacionesAcceso();
    this.listarNotificacionesAccesoAlumnos();
  }

  /**
   * Función para listar las solicitud de acceso
   */
  listarNotificacionesAcceso() {
    this.notificacionService
      .listarCursosSolicitudAcceso(this.idUsuario)
      .subscribe((x) => {
        this.solicutdAcceso = x[0];
      });
  }

  listarNotificacionesAccesoAlumnos() {
    this.notificacionService
      .listarCursosSolicitudAccesoAlumnos(this.idUsuario)
      .subscribe((x) => {
        this.solicutdAcceso2 = x[0];
      });
  }
  aceptarInvitacion(
    situacion_id: number,
    curso_id: number,
    usuario_id: number
  ) {
    this.notificacion.curso_id = curso_id;
    this.notificacion.usuario_id = usuario_id;
    this.notificacion.situacion_id = situacion_id;

    this.notificacionService
      .aceptarInvitacion(this.notificacion)
      .subscribe((x) => {
        Swal.fire({
          title: 'Solicitud respondidas',
          text: `Se respondio correctamente la solicitud`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
          timer: 1500,
        }).then((res) => {
          this.listarNotificacionesAccesoAlumnos();
        });
      });
  }
  darBloquearAcceso(
    situacion_id: number,
    curso_id: number,
    usuario_id: number
  ) {
    this.notificacion.curso_id = curso_id;
    this.notificacion.usuario_id = usuario_id;
    this.notificacion.situacion_id = situacion_id;

    this.notificacionService
      .darBloquearAccesoCurso(this.notificacion)
      .subscribe((x) => {
        Swal.fire({
          title: 'Solicitud respondidas',
          text: `Se respondio correctamente la solicitud`,
          icon: 'success',
          confirmButtonColor: '#2F6DF2',
          timer: 1500,
        }).then((res) => {
          this.listarNotificacionesAcceso();
        });
      });
  }
}
