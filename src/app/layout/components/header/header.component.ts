import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioRegistrado: boolean;
  usuario: string;
  constructor() {}

  ngOnInit(): void {
    if (+sessionStorage.getItem('usuario_id') != 0) {
      this.usuarioRegistrado = true;
      this.usuario = sessionStorage.getItem('usuario_nombre');
    } else {
      this.usuarioRegistrado = false;
    }
  }
}
