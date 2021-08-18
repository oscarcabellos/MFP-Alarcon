import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/curso/modelo/curso';
import { CursoService } from '../../services/curso.service';
import { SugerenciaService } from '../../services/sugerencia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cursos: Curso[] = [];
  sugerencias = [1, 2, 3];
  constructor(
    private readonly cursoService: CursoService,
    private readonly sugerenciaService: SugerenciaService
  ) {}

  ngOnInit(): void {
    this.listarCursos();
    this.listarSugerencias();
  }

  /**
   * Función para listar los cursos com mas usuarios
   */
  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      for (let i = 1; i <= 4; i++) {
        this.cursos.push(x['cursos'][i]);
      }
    });
  }

  /**
   * Función para validar si un usuario ha inciado sesión
   * @returns {Boolean} Validacipon si esta logeado
   */
  estaRegistrado() {
    return +sessionStorage.getItem('usuario_id') !== 0;
  }

  listarSugerencias() {
    this.sugerenciaService.listarSugerencias().subscribe((x) => {});
  }
}
