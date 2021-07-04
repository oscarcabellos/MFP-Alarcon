import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import Swal from 'sweetalert2';
import { CursoService } from '../../servicios/curso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private cursoService: CursoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listarUsuarios(this.cursoId);
    this.usuarioProfesor = true;
    this.agregarForm = this.formBuilder.group({
      correoUsuario: ['', [Validators.required, Validators.email]],
    });
  }

  get correoNoValido() {
    return (
      this.agregarForm.get('correoUsuario').invalid &&
      this.agregarForm.get('correoUsuario').touched
    );
  }

  listarUsuarios(id: number) {
    this.cursoService.listarUsuariosPorCurso(id).subscribe((x) => {
      this.usuarios = x['data'];
    });
  }

  agregarUsuario() {
    if (this.agregarForm.valid) {
      this.cursoService
        .agrearUsuarioCurso(
          this.cursoId,
          this.agregarForm.get('correoUsuario').value
        )
        .subscribe((x) => {
          this.listarUsuarios(this.cursoId);
          this.agregarForm.get('correoUsuario').setValue('');
        });
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
        this.usuarios = this.usuarios.filter((u) => u.usuario_id != id);
        Swal.fire({
          title: 'Eliminado',
          icon: 'success',
          showConfirmButton: false,
          width: '20rem',
        });
      }
    });
  }

  descargarUsuarios() {
    alert('Descargando archivo');
  }
}
