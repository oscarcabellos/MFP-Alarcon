import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import Swal from 'sweetalert2';
import { CursoService } from '../../servicios/curso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from '../../servicios/excel.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {
  @Input() cursoId: number;
  @Input() usuarioProfesor: boolean;
  usuarios: Usuario[] = [];
  agregarForm: FormGroup;
  totalAlumnos: number;

  constructor(
    private readonly cursoService: CursoService,
    private readonly formBuilder: FormBuilder,
    private readonly excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.listarUsuarios(this.cursoId);
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
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      this.usuarios = x['data'][0];
      this.totalAlumnos = x['data'][0].length;
    });
  }

  /**
   * Función para agregar un usuario al curso
   */
  validarCorreoIngresado() {
    if (this.agregarForm.valid) {
      if (
        this.validarCorreoIgualAProfesor(
          sessionStorage.getItem('correo'),
          this.agregarForm.get('correoUsuario').value
        )
      ) {
        Swal.fire({
          icon: 'error',
          title: 'No se puede agregar a su propio curso',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (
        this.validarUsuarioAgregado(this.agregarForm.get('correoUsuario').value)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'El usuario ya ha sido agregado',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.agregarUsuario(
          this.cursoId,
          this.agregarForm.get('correoUsuario').value
        );
      }
    } else {
      Swal.fire({
        title: 'Correo no válido',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        width: '20rem',
      });
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
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado la invitación',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarUsuarios(this.cursoId);
        this.agregarForm.reset();
      });
  }

  /**
   * Función para eliminar a un usuario de un curso
   * @param id Identificador del usuario a eliminar
   */
  eliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Seguro de eliminar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      width: '20rem',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios = this.usuarios.filter((u) => u.usuario_id !== id);
        Swal.fire({
          title: 'Eliminado',
          icon: 'success',
          showConfirmButton: false,
          width: '20rem',
          timer: 1500,
        });
      }
    });
  }

  /**
   * Función para descargar la lista de alumnos inscritos en un archivo excel
   */
  descargarUsuarios(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      if (x['data'][0]?.length > 0) {
        this.excelService.exportAsExcelFile(x.data[0], 'ListaCurso');
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
    if (usuario?.situacion_id === 1) {
      return 'Activo';
    }
    if (usuario?.situacion_id === 2) {
      return 'Denegado';
    }
    if (usuario?.situacion_id === 3) {
      return 'Pendiente';
    }
  }
}
