/**
 * Se importa las librerias desde anngular core
 */
import { Component, OnInit } from '@angular/core';
/**
 * Se importa el modelo de la categoria
 */
import { Categoria } from 'src/app/curso/modelo/categoria';
/**
 * Se importa el modelo del curso
 */
import { Curso } from 'src/app/curso/modelo/curso';
/**
 * Se importa el servicio de categorias
 */
import { CategoriaService } from 'src/app/curso/servicios/categoria.service';
/**
 * Se importa el modelo de la sugerencias
 */
import { Sugerencia } from 'src/app/sugerencia/modelos/sugerencia';
/**
 * Se importa el servicio de los cursos
 */
import { CursoService } from '../../services/curso.service';
/**
 * Se importa el servicio de las sugerencias
 */
import { SugerenciaService } from '../../services/sugerencia.service';

/**
 * Se declaran las referencias del componente
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
/**
 * Se crea la clase del componente home
 */
export class HomeComponent implements OnInit {
  /**
   * Se crea array de los cursos
   */
  cursos: Curso[] = [];
  /**
   * se crea array para las sugerencias
   */
  sugerencias: Sugerencia[];
  /**
   * se crea array para las categorias
   */
  categorias: Categoria[];
  /**
   * se crea array para almacenar los votos
   */
  votosSugerencias: any[];

  /**
   * Contructor para inciar los servicios
   * @param cursoService servicio para acceder a un curso
   * @param sugerenciaService servicio para las sugerencias
   * @param categoriaService servicio oara las categorias
   */
  constructor(
    private readonly cursoService: CursoService,
    private readonly sugerenciaService: SugerenciaService,
    private categoriaService: CategoriaService
  ) {}

  /**
   * Función para incializar las variables
   */
  ngOnInit(): void {
    /**
     * Se llama a la funcion para listar las categorias
     */
    this.listarCategorias();
    /**
     * Se llama la funcion para listar las sugerencias
     */
    this.listarSugerencias();
  }

  /**
   * Función para listar los cursos com mas usuarios
   */
  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      /**
       * Se almacena los cursos en la variable curso
       */
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
      /**
       * Se alamcena las sugerencias
       */
      this.sugerencias = x['list'];
      this.listarVotos();
    });
  }

  /**
   * Función para listar las categorias
   */
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      /**
       * Se almacenan las categorias
       */
      this.categorias = x['categories'];
      /**
       * Se llama a la función para listar cursos
       */
      this.listarCursos();
    });
  }
  /**
   * Función para obtener la informacion de una categoria por su id
   * @param id Identificador de la categoria
   */
  obtenerCategoria(id) {
    if (id !== undefined) {
      /**
       * Se realiza la busqueda de la categoria
       */
      const nombre = this.categorias.find((c) => c?.categoria_id === id);
      return nombre?.categoria_nombre ? nombre?.categoria_nombre : '';
    }
  }

  /**
   * Función para listar los votos de las sugerencias
   */
  listarVotos() {
    this.sugerenciaService.listarSugerenciasVotos().subscribe((x) => {
      /**
       * Se almacena los votos de las sugerencias
       */
      this.votosSugerencias = x['list'];
      /**
       * Se filtra las sugerencias ocn mayor cantidad de votos
       */
      this.sugerencias = this.sugerencias.filter((s) => {
        for (let v of this.votosSugerencias) {
          if (v.sugerencia_id === s.sugerencia_id) {
            return true;
          }
        }
        return false;
      });
    });
  }
}
