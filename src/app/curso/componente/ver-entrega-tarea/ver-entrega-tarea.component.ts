import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntregaTarea } from '../../modelo/entrega-tarea';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';

@Component({
  selector: 'app-ver-entrega-tarea',
  templateUrl: './ver-entrega-tarea.component.html',
  styleUrls: ['./ver-entrega-tarea.component.css'],
})
export class VerEntregaTareaComponent implements OnInit {
  @Input() fromParent;
  tareas: EntregaTarea[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private materialService: NuevoMaterialService
  ) {}

  ngOnInit(): void {
    /* Codigo de ejecucion al inicio del componenente */

    this.listarTareas(this.fromParent.tarea.tarea_id);
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje que se envia la componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  listarTareas(id) {
    this.materialService
      .listarEntregaTareas(id)
      .subscribe((x: EntregaTarea[]) => {
        this.tareas = x;
      });
  }
}
