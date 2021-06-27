import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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

  guardarSugerencia() {
    Swal.fire({
      title: 'La sugerencia será publica para todos los usuario',
      text: '¿Desea continuar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      width: '30rem',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Guardado',
          icon: 'success',
          showConfirmButton: false,
          width: '20rem',
        });
      }
    });
  }
}
