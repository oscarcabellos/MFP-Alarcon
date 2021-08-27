/**
 * Se importa los modulos que se necesitan desde el core
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * Se importa el modulo del modal con sus funcionalidad
 */
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa la clase Curso desde los modelos del módulo
 */
import { Curso } from '../../modelo/curso';

/**
 * Se crean las referencias a cada archivo que necesita el componente
 */
@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css'],
})

/**
 * Se crea la clase del componente de editar curso
 */
export class EditarCursoComponent implements OnInit {
  /**
   * Parametro recibido desde el componente padre
   */
  @Input() fromParent;

  /**
   * Variable para determinar si se puede editar
   */
  editar = true;

  /**
   * Objeto con la información dle curso
   */
  curso: Curso;

  /**
   * Constructor con la inicialización de los modulos
   * @param activeModal Modulo para el manejo del modal de angular
   */
  constructor(public activeModal: NgbActiveModal) {}

  /**
   * Función para inicializar las variables
   */
  ngOnInit(): void {
    /**
     * Se obtiene el curso desde el componente padre
     */
    this.curso = this.fromParent?.curso;
  }

  /**
   * Función para cerrar el modal
   * @param sendData Mensaje que se envia al componente padre
   */
  closeModal(sendData) {
    /**
     * Se envia mensaje al componente padre
     */
    this.activeModal.close(sendData);
  }

  /**
   * Función que se recibe del comoponente hijo
   * @param data mensaje que se recibe del componente hijo
   */
  closeModalChild(data: any) {
    /**
     * Se envia mensaje de cerrar al componete padre
     */
    this.closeModal('cerrar');
  }
}
