import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    let usuario = new Usuario();
    usuario = {
      usuario_nombre: 'usuario_dos',
      usuario_apellidos: 'usuario_apellido',
      usuario_contrasenia: 'prueba2',
      correo: 'prueba2@gmail.com',
      url: '',
    };
    //this.crearUsuario(usuario);
  }

  crearUsuario(usuario: Usuario) {
    this.usuarioService.crearUsuario(usuario).subscribe((x) => {
      console.log(x);
    });
  }
}
