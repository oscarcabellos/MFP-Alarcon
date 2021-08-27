/**
 * Se importa las librerias para crear el componente
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * Se inporta las dependencias necesarias para utilizar el modal de bootstrap
 */
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa la clase de entregar tarea
 */
import { EntregaTarea } from '../../modelo/entrega-tarea';

/**
 * Se importa el servicio para crear un nuevo material
 */
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';

/**
 * Se añade los archvios necesarios para el componente
 */
@Component({
  selector: 'app-ver-entrega-tarea',
  templateUrl: './ver-entrega-tarea.component.html',
  styleUrls: ['./ver-entrega-tarea.component.css'],
})

/**
 * Se crea la clase para el componente de ver entregas
 */
export class VerEntregaTareaComponent implements OnInit {
  /**
   * Parametros recibidos desde el componente padre
   */
  @Input() fromParent;

  /**
   * array con lista de entregas realizadas
   */
  tareas: EntregaTarea[] = [];

  /**
   * Constructor para inicializar las dependencias
   * @param activeModal moduo para el manejo del modal
   * @param materialService servicio para listar las entregas realizadas
   */
  constructor(
    public activeModal: NgbActiveModal,
    private materialService: NuevoMaterialService
  ) {}

  /**
   * Función para incializar las variables del componente
   */
  ngOnInit(): void {
    /* Codigo de ejecucion al inicio del componenente */
    /**
     * Se llama a la función para listar las tareas entregadas
     */
    this.listarTareas(this.fromParent?.tarea?.tarea_id);
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje que se envia la componente padre
   */
  closeModal(sendData) {
    /**
     * Se llama a la función para cerra el modal
     */
    this.activeModal.close(sendData);
  }

  /**
   * Función para listar las entregas realizadas por los alumnos
   * @param id Identificador del curso actual
   */
  listarTareas(id) {
    this.materialService
      .listarEntregaTareas(id)
      .subscribe((x: EntregaTarea[]) => {
        /**
         * Se almacena la lista de tareas recibidas
         */
        this.tareas = x;
      });
  }
}
