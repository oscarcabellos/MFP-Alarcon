import { Component, OnInit } from '@angular/core';
import { Curso } from '../../modelo/curso';
import { CursoService } from '../../servicios/curso.service';
import { CloudBinaryService } from '../../../services/cloud-binary.service';
import { Data } from '../../../services/dataModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../servicios/categoria.service';
import { Categoria } from '../../modelo/categoria';
import { AppServiceBase } from 'src/app/core/appServiceBase';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
})
export class CrearCursoComponent implements OnInit {
  image: any[];
  usuario_id: number;
  cursoForm: FormGroup;
  categorias: Categoria[]=[];
  nombreImagen: string;

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
      let curso = new Curso();

      if (this.image != null || this.image != undefined) {
        this.cloudBinaryService
          .sendPhoto(this.image[0])
          .subscribe((response: Data) => {
            curso = this.cursoForm.value;
            curso.imagen = response['secure_url'];
            curso.usuario_id = this.usuario_id;
            this.guardar(curso);
          });
      } else {
        curso = this.cursoForm.value;
        curso.usuario_id = this.usuario_id;
        this.guardar(curso);
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
    this.categoriaService.listarCategorias().subscribe( (x) => (this.categorias = x['categories']));
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
}
