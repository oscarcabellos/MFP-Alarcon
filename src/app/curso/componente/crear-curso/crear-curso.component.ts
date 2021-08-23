import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { CloudBinaryService } from '../../../services/cloud-binary.service';
import { Data } from '../../../services/dataModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../servicios/categoria.service';
import { Categoria } from '../../modelo/categoria';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  /* Imagen de seleccion en el html */
  image: any[];
  /* usuario_id que se guarda y se usa del la sessionstorage */
  usuario_id: number;
  /* nombre del curso que utiliza ReactiveFormModule */
  cursoForm: FormGroup;
  /* Lista de categorias */
  categorias: Categoria[] = [];
  /* Se guarda el nombre de la imagen seleccionada */
  nombreImagen: string;

  @Input() editar: boolean;
  @Input() curso: Curso;
  @Output() cerrarModal = new EventEmitter<string>();

  constructor(
    private cursoService: CursoService,
    private cloudBinaryService: CloudBinaryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.usuario_id = +sessionStorage.getItem('usuario_id');
    this.cursoForm = this.formBuilder.group({
      curso_nombre: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(160)]],
      conoci_previo: [''],
      privacidad_id: ['', Validators.required],
      categoria_id: [''],
    });
    this.listarCategorias();
    if (this.editar) {
      this.cargarDatosCurso(this.curso);
    }
  }

  /**
   * Comprobacion de la seleccion de un archivo
   * y guarda el nombre de la imagen para poder mostrarse
   * @param  {} event
   */
  onFileChange(event) {
    this.image = event.target.files;
    this.nombreImagen = this.image[0].name;
  }

  /**
   * Funcion para guardar los valores ingresados en el curso
   */
  crearCurso() {
    if (this.cursoForm.valid) {
      let cursoNuevo = new Curso();

      if (this.editar) {
        this.curso.curso_nombre = this.cursoForm.get('curso_nombre').value;
        this.curso.descripcion = this.cursoForm.get('descripcion').value;
        this.curso.privacidad_id = this.cursoForm.get('privacidad_id').value;
        this.curso.categoria_id = this.cursoForm.get('categoria_id').value;
        this.curso.conoci_previo = this.cursoForm.get('conoci_previo').value;
        this.actualizarCurso(this.curso);
      } else {
        if (this.image != null || this.image != undefined) {
          this.cloudBinaryService
            .sendPhoto(this.image[0])
            .subscribe((response: Data) => {
              cursoNuevo = this.cursoForm.value;
              cursoNuevo.imagen = response['secure_url'];
              cursoNuevo.usuario_id = this.usuario_id;
              this.guardar(cursoNuevo);
            });
        } else {
          cursoNuevo = this.cursoForm.value;
          cursoNuevo.usuario_id = this.usuario_id;
          this.guardar(cursoNuevo);
        }
      }
    } else {
      Swal.fire({
        title: 'Faltan completar campos',
        icon: 'error',
        confirmButtonColor: '#2F6DF2',
      });
      Object.values(this.cursoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Funcion para el registro de un curso
   * @param  {Curso} curso
   */
  guardar(curso: Curso) {
    this.cursoService.crearCurso(curso).subscribe((x) => {
      Swal.fire({
        title: 'Curso creado',
        text: `El curso se ha creado con exito`,
        icon: 'success',
        confirmButtonColor: '#2F6DF2',
      }).then((res) => {
        this.router.navigate(['cursos/dashboard']).then(() => {
          window.location.reload();
        });
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

  /**
   * Validar nombre del curso
   */
  get nombreNoValido() {
    return (
      this.cursoForm.get('curso_nombre').invalid &&
      this.cursoForm.get('curso_nombre').touched
    );
  }
  /**
   * Validar descripcion del curso
   */
  get descripcioneNoValido() {
    return (
      this.cursoForm.get('descripcion').invalid &&
      this.cursoForm.get('descripcion').touched
    );
  }
  /**
   * Validar privacidad del curso
   */
  get privacidadNoValido() {
    return (
      this.cursoForm.get('privacidad_id').invalid &&
      this.cursoForm.get('privacidad_id').touched
    );
  }

  cargarDatosCurso(curso: Curso) {
    this.cursoForm.get('curso_nombre').setValue(curso?.curso_nombre);
    this.cursoForm.get('descripcion').setValue(curso?.descripcion);
    this.cursoForm.get('privacidad_id').setValue(curso?.privacidad_id);
    this.cursoForm.get('categoria_id').setValue(curso?.categoria_id);
    this.cursoForm.get('conoci_previo').setValue(curso?.conoci_previo);
  }

  actualizarCurso(curso: Curso) {
    this.cursoService.editarCurso(curso.curso_id, curso).subscribe((x) => {
      this.cerrarModal.emit('close');
    });
  }
}
