import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-entrega-tarea',
  templateUrl: './ver-entrega-tarea.component.html',
  styleUrls: ['./ver-entrega-tarea.component.css'],
})
export class VerEntregaTareaComponent implements OnInit {
  @Input() fromParent;
  tareas = [];
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    /* Codigo de ejecucion al inicio del componenente */
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje que se envia la componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
