import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  correoUsuario: string;
  usuarioProfesor: boolean;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios(1);
    this.usuarioProfesor = true;
  }

  listarUsuarios(id: number) {
    /* this.usuarioService.listarUsuarios(id).subscribe((x) => {
      this.usuarios = x;
    }); */
    this.usuarios = [
      {
        idUsuario: 1,
        usuario_nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
        url: 'https://github.com/mdo.png',
        usuario_apellidos: '',
        password: '',
      },
      {
        idUsuario: 2,
        usuario_nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
        url: '',
        usuario_apellidos: '',
        password: '',
      },
      {
        idUsuario: 3,
        usuario_nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
        url: 'https://github.com/mdo.png',
        usuario_apellidos: '',
        password: '',
      },
      {
        idUsuario: 4,
        usuario_nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
        url: '',
        usuario_apellidos: '',
        password: '',
      },
      {
        idUsuario: 5,
        usuario_nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
        url: 'https://github.com/mdo.png',
        usuario_apellidos: '',
        password: '',
      },
    ];
  }

  agregarUsuario() {
    if (this.validarCorreo(this.correoUsuario)) {
      this.usuarios.push({
        idUsuario: this.usuarios.length,
        usuario_nombre: 'sin nombre',
        correo: this.correoUsuario,
        url: '',
        usuario_apellidos: '',
        password: '',
      });
      this.correoUsuario = '';
    } else {
      Swal.fire({
        title: 'Correo no válido',
        //text: 'Correo ingresado no válido',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        width: '20rem',
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
        this.usuarios = this.usuarios.filter((u) => u.idUsuario != id);
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

  validarCorreo(correo: string) {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    if (
      regex.test(correo) &&
      correo != null &&
      correo != undefined &&
      correo != '' &&
      correo?.length > 0
    ) {
      return true;
    }
    return false;
  }
}
