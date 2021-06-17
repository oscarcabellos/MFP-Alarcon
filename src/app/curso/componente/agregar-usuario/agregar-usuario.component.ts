import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

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
        nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
      },
      {
        idUsuario: 2,
        nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
      },
      {
        idUsuario: 3,
        nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
      },
      {
        idUsuario: 4,
        nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
      },
      {
        idUsuario: 5,
        nombre: 'nombre apelidopaterno apeliidomaterno',
        correo: 'correo@gmail.com',
      },
    ];
  }

  agregarUsuario() {
    if (this.correoUsuario != '') {
      this.usuarios.push({
        idUsuario: this.usuarios.length,
        nombre: 'sin nombre',
        correo: this.correoUsuario,
      });
      this.correoUsuario = '';
    }
  }

  eliminarUsuario(id: number) {
    console.log(id);
    this.usuarios = this.usuarios.filter((u) => u.idUsuario != id);
  }

  descargarUsuarios() {
    alert('Descargando archivo');
  }
}
