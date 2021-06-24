import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  cambio: boolean;
  certificados = [1, 2, 3];

  constructor() {
    this.cambio = true;
  }

  ngOnInit(): void {}

  modificarDatos() {
    this.cambio = !this.cambio;
  }
}
