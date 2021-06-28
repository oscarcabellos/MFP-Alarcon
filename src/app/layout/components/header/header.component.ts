import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioRegistrado: boolean;
  usuario: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (+sessionStorage.getItem('usuario_id') != 0) {
      this.usuarioRegistrado = true;
      this.usuario = sessionStorage.getItem('usuario_nombre');
    } else {
      this.usuarioRegistrado = false;
    }
  }

  logout() {
    sessionStorage.removeItem('usuario_id');
    sessionStorage.removeItem('usuario_apellidos');
    sessionStorage.removeItem('usuario_nombre');
    sessionStorage.removeItem('correo');
    this.router.navigate(['user/login']).then(() => {
      window.location.reload();
    });
  }
}
