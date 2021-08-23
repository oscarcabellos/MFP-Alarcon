import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso } from '../../modelo/curso';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css'],
})
export class EditarCursoComponent implements OnInit {
  @Input() fromParent;
  editar = true;
  curso: Curso;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.curso = this.fromParent.curso;
  }

  /**
   * Función para cerrar el modal
   * @param sendData Mensaje que se envia al componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  /**
   * Función que se recibe del comoponente hijo
   * @param data mensaje que se recibe del componente hijo
   */
  closeModalChild(data: any) {
    this.closeModal('cerrar');
  }
}
