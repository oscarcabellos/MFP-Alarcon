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
      usuario_nombre: 'usuario_cuatro',
      usuario_apellidos: 'usuario_apellido',
      correo: 'prueba4@gmail.com',
      password: 'prueba',
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
