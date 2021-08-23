import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/curso/modelo/categoria';
import { CategoriaService } from 'src/app/curso/servicios/categoria.service';
import Swal from 'sweetalert2';
import { Sugerencia } from '../../modelos/sugerencia';
import { SugerenciaService } from '../../servicios/sugerencia.service';

@Component({
  selector: 'app-nueva-sugerencia',
  templateUrl: './nueva-sugerencia.component.html',
  styleUrls: ['./nueva-sugerencia.component.css'],
})
export class NuevaSugerenciaComponent implements OnInit {
  descripcion: string;
  categorias: Categoria[];
  categoria: number;
  nombre: string;

  constructor(
    public activeModal: NgbActiveModal,
    public sugerenciasService: SugerenciaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    // Codigo de inicializacion del componente
    this.listarCategorias();
    this.categoria = 0;
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  guardarSugerencia() {
    const sugerencia: Sugerencia = new Sugerencia();
    sugerencia.categoria_id = this.categoria;
    sugerencia.sugerencia_nombre_curso = this.nombre;
    sugerencia.descripcion = this.descripcion;

    this.sugerenciasService.crearSugerencia(sugerencia).subscribe((resp) => {
      Swal.fire({
        title: 'Publicado',
        icon: 'success',
        showConfirmButton: false,
        width: '20rem',
        timer: 1500,
      }).then(() => {
        this.closeModal('cerrar');
      });
    });
  }

  /**
   * Listado de todas la categorias
   */
  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }
}
