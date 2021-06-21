import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cursos = [1, 2, 3, 4];
  sugerencias = [1, 2, 3];
  constructor() {}

  ngOnInit(): void {}
}
