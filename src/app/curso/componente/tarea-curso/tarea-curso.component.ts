import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';
import { VerEntregaTareaComponent } from '../ver-entrega-tarea/ver-entrega-tarea.component';

@Component({
  selector: 'app-tarea-curso',
  templateUrl: './tarea-curso.component.html',
  styleUrls: ['./tarea-curso.component.css'],
})
export class TareaCursoComponent implements OnInit {
  @Input() usuarioProfesor: boolean;

  tareas = [1, 2, 3, 4, 5];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }
  entregar(id: number) {
    alert('Entregado ' + id);
  }

  openModal() {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: true,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //intencional
      },
      (reason) => {
        //intencional
      }
    );
  }

  openModalEntregas(id: number) {
    const modalRef = this.modalService.open(VerEntregaTareaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: id,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //intencional
      },
      (reason) => {
        //intencional
      }
    );
  }
}
