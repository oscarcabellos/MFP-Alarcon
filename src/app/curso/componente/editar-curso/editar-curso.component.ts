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

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  closeModalChild(data: any) {
    this.closeModal('cerrar');
  }
}
