import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
  @ViewChild('Privacidad3') Privacidad3: ElementRef;

  constructor(
    private cursoService: CursoService,
    private cloudBinaryService: CloudBinaryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  //metodo para inicializar los metodos del componenete
  ngOnInit(): void {
    //Asignacion de usuario_id de la sessionStorage
    this.usuario_id = +sessionStorage.getItem('usuario_id');
    //Creacion del formulario del curso con sus valores iniciales
    this.cursoForm = this.formBuilder.group({
      //campo curso_nombre vacio que es requerido y maximo de caracteres de 30
      curso_nombre: ['', [Validators.required, Validators.maxLength(30)]],
      //campo descripcion vacio que es requerido y un maximo de caracteres de 160
      descripcion: ['', [Validators.required, Validators.maxLength(160)]],
      //campo conoci_previo vacio
      conoci_previo: [''],
      //campo privacidad_id vacio y que es requerido
      privacidad_id: ['', Validators.required],
      //campo categoria_id vacio
      categoria_id: [''],
    });
    //Llamada para listar las categorias al inicio
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
    //asignacion de la data seleccionada de la imagen
    this.image = event.target.files;
    //asignacion del campo imagen del nombre de la imagen seleccionada
    this.nombreImagen = this.image[0].name;
  }

  /**
   * Funcion para guardar los valores ingresados en el curso
   */
  crearCurso() {
    /* 
    * Para la creacion del curso, primero el formulario tiene que estar validado en caso contrario
    * se el mostraria una alerta, mencionando que ingrese los datos faltantes
    */
    if (this.cursoForm.valid) {
      //Creacion de un objeto curso
      let cursoNuevo = new Curso();
      // Otra validacion para saber si se quiere editar el curso
      if (this.editar) {
        //se le esta asignando el valor del nombre del curso del formulario al objeto curso
        //en su variable curso_nombre
        this.curso.curso_nombre = this.cursoForm.get('curso_nombre').value;
        //se le esta asignando el valor del descripcion del curso del formulario al objeto curso
        //en su variable descripcion
        this.curso.descripcion = this.cursoForm.get('descripcion').value;
        //se le esta asignando el valor del categoria_id del curso del formulario al objeto curso
        //en su variable categoria_id
        this.curso.categoria_id = this.cursoForm.get('categoria_id').value;
        //se le esta asignando el valor del conocimiento previo del curso del formulario al objeto curso
        //en su variable conoco_previo
        this.curso.conoci_previo = this.cursoForm.get('conoci_previo').value;
        this.actualizarCurso(this.curso);
      } else {
        if (this.image != null || this.image != undefined) {
          this.cloudBinaryService
            .sendPhoto(this.image[0])
            .subscribe((response: Data) => {
              //Asignacion de los datos del formulario al obejeto curso
              cursoNuevo = this.cursoForm.value;
              cursoNuevo.imagen = response['secure_url'];
              //Asignacion del usuario_id al campo del formulario usuario_id
              cursoNuevo.usuario_id = this.usuario_id;
              //Llamada al metodo guardar() para la creacion de un nuevo curso
              this.guardar(cursoNuevo);
            });
        } else {
          //Asignacion de los datos del formulario al obejeto curso
          cursoNuevo = this.cursoForm.value;
          cursoNuevo.usuario_id = this.usuario_id;
          this.guardar(cursoNuevo);
        }
      }
    } else {
      //Muestra una alerta en caso se quiera registrar un curso con algun dato faltante
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
      //Alerta de que el curso se creo exitosamente
      Swal.fire({
        title: 'Curso creado',
        text: `El curso se ha creado con exito`,
        icon: 'success',
        confirmButtonColor: '#2F6DF2',
      }).then((res) => {
        //redireccionando a dashboard
        this.router.navigate(['cursos/dashboard']).then(() => {
          //permite ir a la misma pagina donde se encontraba
          window.location.reload();
        });
      });
    });
  }

  /**
   * Listado de todas la categorias
   */
  listarCategorias() {
    //se llama al servicio de listar las categorias y se le asigna
    //a un array de categoria
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }

  /**
   * Validar nombre del curso
   */
  get nombreNoValido() {
    return (
      //invalidacion del campo curso_nombre al momento de presionar le input
      this.cursoForm.get('curso_nombre').invalid &&
      this.cursoForm.get('curso_nombre').touched
    );
  }
  /**
   * Validar descripcion del curso
   */
  get descripcioneNoValido() {
    return (
      //invalidacion del campo descripcion al momento de presionar le input
      this.cursoForm.get('descripcion').invalid &&
      this.cursoForm.get('descripcion').touched
    );
  }
  /**
   * Validar privacidad del curso
   */
  get privacidadNoValido() {
    return (
      //invalidacion del campo privacidad_id al momento de presionar le input
      this.cursoForm.get('privacidad_id').invalid &&
      this.cursoForm.get('privacidad_id').touched
    );
  }

  /**
   * Función para cargar los datos al formulario
   * @param curso Onjeto con la información de un curso
   */
  cargarDatosCurso(curso: Curso) {
    //Se asigna datos del curso_nombre con la propiedad setValue
    this.cursoForm.get('curso_nombre').setValue(curso?.curso_nombre);
    //Se asigna datos del descripcion con la propiedad setValue
    this.cursoForm.get('descripcion').setValue(curso?.descripcion);
    //Se asigna datos del privacidad_id con la propiedad setValue
    this.cursoForm.get('privacidad_id').setValue(curso?.privacidad_id);
    //Se asigna datos del categoria_id con la propiedad setValue
    this.cursoForm.get('categoria_id').setValue(curso?.categoria_id);
    //Se asigna datos del conoci_previo con la propiedad setValue
    this.cursoForm.get('conoci_previo').setValue(curso?.conoci_previo);
  }

  /**
   * Función para actualizar los datos de un curso
   * @param curso Objeto con la información actualizada
   */
  actualizarCurso(curso: Curso) {
    this.cursoService.editarCurso(curso.curso_id, curso).subscribe((x) => {
      //Alerta cuando el curso se actualizo exitosamente
      Swal.fire({
        title: 'Curso actualizado',
        icon: 'success',
        showConfirmButton: false,
        width: '25rem',
        timer: 1500,
      }).then(() => {
        this.cerrarModal.emit('close');
      });
    });
  }
}
