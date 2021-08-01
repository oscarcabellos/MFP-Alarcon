import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Sugerencia } from '../../modelos/sugerencia';
import { SugerenciaService } from '../../servicios/sugerencia.service';

@Component({
  selector: 'app-nueva-sugerencia',
  templateUrl: './nueva-sugerencia.component.html',
  styleUrls: ['./nueva-sugerencia.component.css'],
})
export class NuevaSugerenciaComponent implements OnInit {
  descripcion;
  constructor(
    public activeModal: NgbActiveModal,
    public sugerenciasService: SugerenciaService
  ) {}

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  guardarSugerencia() {
    const sugerencia: Sugerencia = new Sugerencia();
    sugerencia.categoria_id = 1;
    sugerencia.sugerencia_nombre_curso = 'prueba';
    sugerencia.sugerencia_puntuacion_curso = 8;
    sugerencia.numero_votos = 3;
    sugerencia.sugerencia_estado = 'Entregado';
    sugerencia.descripcion = this.descripcion;

    this.sugerenciasService.crearSugerencia(sugerencia).subscribe((resp) => {
      console.log(resp);
    });

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
          timer: 1500,
        }).then((res) => {
          this.closeModal('cerrar');
        });
      }
    });
  }
}
