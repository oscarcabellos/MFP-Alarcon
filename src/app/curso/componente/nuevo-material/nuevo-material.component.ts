import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css'],
})
export class NuevoMaterialComponent implements OnInit {
  @Input() fromParent;
  tarea: boolean;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.tarea = this.fromParent.tarea;
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
