import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-entrega-tarea',
  templateUrl: './ver-entrega-tarea.component.html',
  styleUrls: ['./ver-entrega-tarea.component.css'],
})
export class VerEntregaTareaComponent implements OnInit {
  @Input() fromParent;
  tareas = [1, 1, 1, 1, 1, 1];
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
