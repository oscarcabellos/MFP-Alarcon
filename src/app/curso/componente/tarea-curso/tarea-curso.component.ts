import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from '../../modelo/tarea';
import { TareaService } from '../../servicios/tarea.service';
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';
import { VerEntregaTareaComponent } from '../ver-entrega-tarea/ver-entrega-tarea.component';

@Component({
  selector: 'app-tarea-curso',
  templateUrl: './tarea-curso.component.html',
  styleUrls: ['./tarea-curso.component.css'],
})
export class TareaCursoComponent implements OnInit {
  @Input() usuarioProfesor: boolean;
  @Input() cursoId: number;
  tareas: Tarea[];
  constructor(
    private modalService: NgbModal,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.listarTareas(this.cursoId);
  }

  initForm() {}

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
        this.listarTareas(this.cursoId);
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
      editarTarea: false,
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

  listarTareas(id: number) {
    this.tareaService.listarTareaCurso(id).subscribe((x) => {
      console.log(x['tareas']);
      this.tareas = x['tareas'];
    });
  }

  editarTarea(tarea: Tarea) {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: true,
      editarTarea: true,
      contenido: tarea,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.listarTareas(this.cursoId);
      },
      (reason) => {
        //intencional
      }
    );
  }
}
