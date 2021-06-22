import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nueva-sugerencia',
  templateUrl: './nueva-sugerencia.component.html',
  styleUrls: ['./nueva-sugerencia.component.css'],
})
export class NuevaSugerenciaComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
