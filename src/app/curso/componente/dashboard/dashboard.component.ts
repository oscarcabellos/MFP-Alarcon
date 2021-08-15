import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }
  /**
   * Función para cerrar sesión
   */
  logout() {
    sessionStorage.removeItem('usuario_id');
    sessionStorage.removeItem('usuario_apellidos');
    sessionStorage.removeItem('usuario_nombre');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('url');
    this.router.navigate(['user/login']).then(() => {
      window.location.reload();
    });
  }
}
