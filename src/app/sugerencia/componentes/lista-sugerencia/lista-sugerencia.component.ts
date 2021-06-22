import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { NuevaSugerenciaComponent } from '../nueva-sugerencia/nueva-sugerencia.component';

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
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.pageActual = 1;
  }

  openModal() {
    const modalRef = this.modalService.open(NuevaSugerenciaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {};
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
}
