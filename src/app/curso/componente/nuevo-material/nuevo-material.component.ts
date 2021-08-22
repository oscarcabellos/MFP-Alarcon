import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from '../../modelo/tarea';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';
import { TareaService } from '../../servicios/tarea.service';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css'],
})
export class NuevoMaterialComponent implements OnInit {
  @Input() fromParent;
  tarea: boolean;
  nombre: any;
  archivos: any[] = [];
  editarTarea: boolean;

  objeto: Tarea;

  constructor(
    public activeModal: NgbActiveModal,
    public NuevoMaterialService: NuevoMaterialService,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.tarea = this.fromParent.tarea;
    this.objeto = new Tarea();
    this.objeto.curso_id = +localStorage.getItem('idcurso');
    this.editarTarea = this.fromParent.editarTarea;
    if (this.fromParent.editarTarea) {
      this.cargarDatosTarea(this.fromParent.contenido);
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  guardarTarea() {
    this.NuevoMaterialService.crearTarea(this.objeto).subscribe((rep) => {
      this.closeModal(rep['msg']);
    });
  }

  modificarImagen(event) {
    this.archivos.push(event.target.files[0]);
  }

  eliminarArchivo(id: number) {
    let archivosAux = [];
    for (let i = 0; i < this.archivos?.length; i++) {
      if (i !== id) {
        archivosAux.push(this.archivos[i]);
      }
    }
    this.archivos = archivosAux;
  }

  cargarDatosTarea(tarea: Tarea) {
    this.objeto.tarea_id = tarea?.tarea_id;
    this.objeto.curso_id = tarea?.curso_id;
    this.objeto.nombre = tarea?.nombre;
    this.objeto.descripcion = tarea?.descripcion;
    this.objeto.tarea_fecha_entrega = tarea?.tarea_fecha_entrega;
  }

  actualizarTarea() {
    console.log(this.objeto);

    this.tareaService
      .actualizarTarea(this.objeto.tarea_id, this.objeto)
      .subscribe((x) => {
        this.closeModal('Actualizado');
      });
  }
}
