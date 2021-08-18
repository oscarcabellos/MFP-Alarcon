import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CloudBinaryService }  from '../../../services/cloud-binary.service';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css'],
})
export class NuevoMaterialComponent implements OnInit {
  @Input() fromParent;
  tarea: boolean;
  nombre: any;

  objeto = {
    curso_id: localStorage.getItem('idcurso'),
    nombre: "",
    descripcion: "",
    tarea_fecha_entrega: "",
    imagen: "",
    // archivo: "",
    enlace: ""
  }

  constructor(
    public activeModal: NgbActiveModal,
    public cloudBinaryService: CloudBinaryService,
    public NuevoMaterialService: NuevoMaterialService,
    private Router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tarea = this.fromParent.tarea;
    
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
    console.log(sendData);
  }

  guardarTarea() {
    this.NuevoMaterialService.crearTarea(this.objeto).subscribe(rep => {
      console.log(rep);
    });
  }

  modificarImagen(event) {
    this.cloudBinaryService.sendPhoto(event.target.files[0]).subscribe(rep => {
      this.objeto.imagen = rep["url"];
    });
  }
}
