/**
 * Se importa losmodulos de angular core
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * Se importa la clase de Usuario
 */
import { Usuario } from '../../modelo/usuario';

/**
 * Se importa el modulo de las alertas
 */
import Swal from 'sweetalert2';

/**
 * Se importa le servicio de cursos
 */
import { CursoService } from '../../servicios/curso.service';

/**
 * Se importa las funcionalidades de los formularios reactivos
 */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Se importa el servicio de generación de excel
 */
import { ExcelService } from '../../servicios/excel.service';

/**
 * Se colocan las referencias de los archivos del modulo
 */
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})

/**
 * Clase para la creación de un componente de agregar usuario
 */
export class AgregarUsuarioComponent implements OnInit {
  /**
   * Parametro recibido del componente padre con el identificador del curso
   */
  @Input() cursoId: number;

  /**
   * Parametro desde el componente padre para saber si el usuario es el profesor del curso
   */
  @Input() usuarioProfesor: boolean;

  /**
   * Variable para listar los usuarios que pertenecen al curso
   */
  usuarios: Usuario[] = [];

  /**
   * Formulario para agregar un usuario
   */
  agregarForm: FormGroup;

  /**
   * Variable para mostrar el total de alumnos de un curso
   */
  totalAlumnos: number;

  /**
   * Constructor con la incialización de los modulos correspondientes
   * @param cursoService Modulo con las funcionalidades para interactuar con un curso
   * @param formBuilder Modulo para la creacion de formularios
   * @param excelService Modulo para acceder a la creacion de un excel
   */
  constructor(
    private readonly cursoService: CursoService,
    private readonly formBuilder: FormBuilder,
    private readonly excelService: ExcelService
  ) {}

  /**
   * Fiunción para inicializar las variables que se van a utilizar en el sistema
   */
  ngOnInit(): void {
    /**
     * Se llama a la función para listar los usuarios
     */
    this.listarUsuarios(this.cursoId);

    /**
     * Se incializa el formulario para agregar un usuarios
     */
    this.agregarForm = this.formBuilder.group({
      correoUsuario: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Comprobar que el correo ingresado sea válido
   */
  get correoNoValido() {
    return (
      this.agregarForm.get('correoUsuario').invalid &&
      this.agregarForm.get('correoUsuario').touched
    );
  }

  /**
   * Función para buscar a los usuarios que pertenecen al curso actual
   * @param id Identificador del curso
   */
  listarUsuarios(id: number) {
    /**
     * Se llama al servicio la obtener los usuarios
     */
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      /**
       * Se almacena la respuesta en los usuarios
       */
      this.usuarios = x['data'][0];

      /**
       * Se almacena la información del total de alumnos del curso
       */
      this.totalAlumnos = x['data'][0].length;
    });
  }

  /**
   * Función para agregar un usuario al curso
   */
  validarCorreoIngresado() {
    /**
     * Se valida que el formulario se haya llenado correctamente
     */
    if (this.agregarForm.valid) {
      /**
       * Se valida que el correo ingresado no sea el mismo que el profesor
       */
      if (
        this.validarCorreoIgualAProfesor(
          sessionStorage.getItem('correo'),
          this.agregarForm.get('correoUsuario').value
        )
      ) {
        /**
         * Se muestra mensaje de advertencia
         */
        Swal.fire({
          icon: 'error',
          title: 'No se puede agregar a su propio curso',
          showConfirmButton: false,
          timer: 1500,
        });
        /**
         * Se valida que usuario no haya sido agregado previamente
         */
      } else if (
        this.validarUsuarioAgregado(this.agregarForm.get('correoUsuario').value)
      ) {
        /**
         * Se muestra mensaje de advertencia sobre el usuario
         */
        Swal.fire({
          icon: 'error',
          title: 'El usuario ya ha sido agregado',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        /**
         * Se agrega el usuario al curso
         */
        this.agregarUsuario(
          this.cursoId,
          this.agregarForm.get('correoUsuario').value
        );
      }
    } else {
      /**
       * Se muestra mensaje de advertencia indicando que el correo no es válido
       */
      Swal.fire({
        title: 'Correo no válido',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        width: '25rem',
      });
      /**
       * Se muestra donde ocurrio el error
       */
      Object.values(this.agregarForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Función para validar que el correo ingresado sea igual al del profesor
   * @param correoIngresado correo del usuario que se desea agregar
   * @param correoUsuario correo del profesor del curso
   * @returns bool - si ambos correo son iguales
   */
  validarCorreoIgualAProfesor(correoIngresado: string, correoUsuario: string) {
    return correoIngresado === correoUsuario;
  }

  /**
   * Función para comprobar si el correo ya ha sido agregado
   * @param correoIngresado correo del usuario que se desea agregar
   * @returns bool - retorna si el correo ya existe en la lista
   */
  validarUsuarioAgregado(correoIngresado: string) {
    return (
      this.usuarios.find((u) => u?.correo === correoIngresado) !== undefined
    );
  }

  /**
   * Función para agregar un nuevo usuario a un curso
   * @param id_curso iddentificador del curso donde se agrega al usuario
   * @param correoIngresado correo del usuario que se desea agregar
   */
  agregarUsuario(id_curso: number, correoIngresado: string) {
    this.cursoService
      .agrearUsuarioCurso(id_curso, correoIngresado)
      .subscribe((x) => {
        /**
         * Se muestra mensaje de exito al agregar un usuario
         */
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado la invitación',
          showConfirmButton: false,
          timer: 1500,
        });
        /**
         * Se llama a la función para listar a los usuarios del curso
         */
        this.listarUsuarios(this.cursoId);

        /**
         * Se reinicia el formulario
         */
        this.agregarForm.reset();
      });
  }

  /**
   * Función para eliminar a un usuario de un curso
   * @param id Identificador del usuario a eliminar
   */
  eliminarUsuario(id: number) {
    /**
     * Se muestra mensaje de confirmación para poder elimianr
     */
    Swal.fire({
      title: '¿Seguro de eliminar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      width: '20rem',
    }).then((result) => {
      /**
       * Se valida que se confirma la eliminación
       */
      if (result.isConfirmed) {
        /**
         * Se llama al servicio para agregar un usuario
         */
        this.cursoService
          .eliminarUsuarioCurso(this.cursoId, id)
          .subscribe((x) => {
            /**
             * Se muestra mensaje de exito al eliminar
             */
            Swal.fire({
              title: 'Eliminado',
              icon: 'success',
              showConfirmButton: false,
              width: '25rem',
              timer: 1500,
            });

            /**
             * Se llama a la funcion de listar para volver a mostrar los usuario en el curso
             */
            this.listarUsuarios(this.cursoId);
          });
      }
    });
  }

  /**
   * Función para descargar la lista de alumnos inscritos en un archivo excel
   */
  descargarUsuarios(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      /**
       * Se valida que la lista de usuarios no este vacia
       */
      if (x['data'][0]?.length > 0) {
        /**
         * Se llama al servicio para generar el excel
         */
        this.excelService.exportAsExcelFile(x.data[0], 'ListaCurso');

        /**
         * Se crea el objeto para mostrar la alerta
         */
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        /**
         * Se muestra mensaje de éxito al descargar
         */
        Toast.fire({
          icon: 'success',
          title: 'Descargando...',
        });
      }
    });
  }

  /**
   * Función para obtener el estado de un usuario respecto a un curso
   * @param usuario Objeto con la informacion de un usuario
   * @returns Cadena con el nombre del estado
   */
  obtenerEstado(usuario) {
    /**
     * Se valida que el usuario pertenece al curso
     */
    if (usuario?.situacion_id === 1) {
      return 'Activo';
    }

    /**
     * Se valida que el usuario no ha rechazado unirse al curso
     */
    if (usuario?.situacion_id === 2) {
      return 'Denegado';
    }

    /**
     * Se valida que el usuario no acepta la invitación
     */
    if (usuario?.situacion_id === 3) {
      return 'Pendiente';
    }
    /**
     * Se valida que el profesor no acepta la invitación
     */
    if (usuario?.situacion_id === 5) {
      return 'Pendiente';
    }
  }
}
