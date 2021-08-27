/**
 * Se importa las librerias de angular
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * Se importa las dependencias para utilizar el modal
 */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa el componente a redireccionar
 */
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';

/**
 * Se configura los elementos que conforman el compoenente
 */
@Component({
  selector: 'app-material-curso',
  templateUrl: './material-curso.component.html',
  styleUrls: ['./material-curso.component.css'],
})

/**
 * Clase para la creación del componente del material de un curso
 */
export class MaterialCursoComponent implements OnInit {
  /**
   * Parametro recibido desde el padre para validar si es usuario es el profesor del curso
   */
  @Input() usuarioProfesor: boolean;

  /**
   * Array con la lista de los materiales del curso
   */
  material = [];

  /**
   * Contructor para incializar el componente
   * @param modalService Dependencias para la utilización del modal
   */
  constructor(private modalService: NgbModal) {}

  /**
   * Función para incializar las variables necesarios del componente
   */
  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }

  /**
   * Función para abrir un modal con un nuevo material
   */
  openModal() {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    /**
     * Información que se envia al componente padre
     */
    let data = {
      tarea: false,
      editarTarea: false,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //Intencional
      },
      (reason) => {
        //Intencional
      }
    );
  }
}
