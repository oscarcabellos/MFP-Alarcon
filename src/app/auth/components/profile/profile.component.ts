import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  correo: any;
  imagen: any;
  usuario_apellidos: any;
  usuario_id: any;
  usuario_nombre: any;

  cambio: boolean;
  certificados = [1, 2, 3];

  constructor() {
    this.cambio = true;
    this.correo = sessionStorage.getItem("correo");
    this.imagen = sessionStorage.getItem("imagen");
    this.usuario_apellidos = sessionStorage.getItem("usuario_apellidos");
    this.usuario_id = sessionStorage.getItem("usuario_id");
    this.usuario_nombre = sessionStorage.getItem("usuario_nombre");
  }

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }

  modificarDatos() {
    this.cambio = !this.cambio;
  }
}
