import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categorias: Categoria[];
  sugerenciaForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public sugerenciasService: SugerenciaService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Codigo de inicializacion del componente
    this.listarCategorias();
    this.sugerenciaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      categoria: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  /**
   * Función para cerrar el modal actual
   * @param sendData Mensaje para enviar al componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  /**
   * Función para guardar una sugerencia
   */
  guardarSugerencia() {
    if (this.sugerenciaForm.valid) {
      const sugerencia: Sugerencia = new Sugerencia();
      sugerencia.categoria_id = this.sugerenciaForm.get('categoria').value;
      sugerencia.sugerencia_nombre_curso =
        this.sugerenciaForm.get('nombre').value;
      sugerencia.descripcion = this.sugerenciaForm.get('descripcion').value;

      this.sugerenciasService.crearSugerencia(sugerencia).subscribe((resp) => {
        Swal.fire({
          title: 'Publicado',
          icon: 'success',
          showConfirmButton: false,
          width: '25rem',
          timer: 1500,
        }).then(() => {
          this.closeModal('cerrar');
        });
      });
    } else {
      Object.values(this.sugerenciaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Listado de todas la categorias
   */
  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }

  get nombreNoValido() {
    return (
      this.sugerenciaForm.get('nombre').invalid &&
      this.sugerenciaForm.get('nombre').touched
    );
  }

  get categoriaNoValida() {
    return (
      this.sugerenciaForm.get('categoria').invalid &&
      this.sugerenciaForm.get('categoria').touched
    );
  }

  get descripcionNoValido() {
    return (
      this.sugerenciaForm.get('descripcion').invalid &&
      this.sugerenciaForm.get('descripcion').touched
    );
  }
}
