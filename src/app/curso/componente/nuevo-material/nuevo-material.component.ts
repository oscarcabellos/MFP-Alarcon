import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';

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

  objeto = {
    curso_id: localStorage.getItem('idcurso'),
    nombre: '',
    descripcion: '',
    tarea_fecha_entrega: '',
  };

  constructor(
    public activeModal: NgbActiveModal,
    public NuevoMaterialService: NuevoMaterialService
  ) {}

  ngOnInit(): void {
    this.tarea = this.fromParent.tarea;
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
}
