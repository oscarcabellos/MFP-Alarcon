import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevaTareaComponent } from '../nueva-tarea/nueva-tarea.component';

@Component({
  selector: 'app-tarea-curso',
  templateUrl: './tarea-curso.component.html',
  styleUrls: ['./tarea-curso.component.css'],
})
export class TareaCursoComponent implements OnInit {
  tareas = [1, 2, 3, 4, 5];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  entregar(id: number) {
    alert('Entregado ' + id);
  }

  openModal() {
    const modalRef = this.modalService.open(NuevaTareaComponent, {
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
