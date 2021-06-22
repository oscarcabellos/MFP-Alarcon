import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-sugerencia',
  templateUrl: './lista-sugerencia.component.html',
  styleUrls: ['./lista-sugerencia.component.css'],
})
export class ListaSugerenciaComponent implements OnInit {
  categorias = [1, 2, 3, 1, 1, 31, 11, 1, 14, 1];
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.pageActual = 1;
  }

  /* openModal() {
    const modalRef = this.modalService.open(ModalTemplateComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      idCaso: this.casosSeleccionados,
      bandeja: 'caso',
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.casosSeleccionados = [];
        $('#tablaDeCasos').DataTable().rows().invalidate('data').draw(false);
      },
      (reason) => {}
    );
  } */
}
