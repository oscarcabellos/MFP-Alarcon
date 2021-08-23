import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/curso/modelo/categoria';
import { Curso } from 'src/app/curso/modelo/curso';
import { CategoriaService } from 'src/app/curso/servicios/categoria.service';
import { Sugerencia } from 'src/app/sugerencia/modelos/sugerencia';
import { CursoService } from '../../services/curso.service';
import { SugerenciaService } from '../../services/sugerencia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cursos: Curso[] = [];
  sugerencias: Sugerencia[];
  categorias: Categoria[];
  constructor(
    private readonly cursoService: CursoService,
    private readonly sugerenciaService: SugerenciaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.listarSugerencias();
  }

  /**
   * Función para listar los cursos com mas usuarios
   */
  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      this.cursos = x['cursos'];
    });
  }

  /**
   * Función para validar si un usuario ha inciado sesión
   * @returns {Boolean} Validacipon si esta logeado
   */
  estaRegistrado() {
    return +sessionStorage.getItem('usuario_id') !== 0;
  }

  /**
   * Función para listar las sugerencias con mayor cantidad de votos
   */
  listarSugerencias() {
    this.sugerenciaService.listarSugerencias().subscribe((x) => {
      this.sugerencias = x;
    });
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x['categories'];
      this.listarCursos();
    });
  }
  /**
   * Función para obtener la informacion de una categoria por su id
   * @param id Identificador de la categoria
   */
  obtenerCategoria(id) {
    if (id !== undefined) {
      const nombre = this.categorias.find((c) => c?.categoria_id === id);
      return nombre?.categoria_nombre ? nombre?.categoria_nombre : '';
    }
  }
}
