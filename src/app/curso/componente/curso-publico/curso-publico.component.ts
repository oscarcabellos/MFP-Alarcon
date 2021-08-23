import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelo/categoria';
import { Curso } from '../../modelo/curso';
import { CategoriaService } from '../../servicios/categoria.service';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso-publico',
  templateUrl: './curso-publico.component.html',
  styleUrls: ['./curso-publico.component.css'],
})
export class CursoPublicoComponent implements OnInit {
  //paginacion de cursos
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  //filtro de cursos
  cursoFilter: string = '';

  cursos: Curso[] = [];
  cursosCompletos: Curso[];
  categorias: Categoria[] = [];
  categoria: number;
  constructor(
    private cursoService: CursoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.categoria = 0;
    this.listarCursos();
    this.listarCategorias();
  }

  listarCursos() {
    this.cursoService.listarCursosPublicos().subscribe((x) => {
      this.cursos = x['cursos'];
      this.cursosCompletos = x['cursos'];
    });
  }
  borrarBusqueda() {
    this.cursoFilter = '';
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x['categories'];
    });
  }

  getNombre(id: number) {
    if (id === undefined) return 'No definido';
    const nombreCategoria = this.buscarNombre(id);
    return nombreCategoria === undefined ? 'No encontrado' : nombreCategoria;
  }

  buscarNombre(id: number) {
    const resultado = this.categorias.find((c) => c?.categoria_id === id);
    return resultado?.categoria_nombre;
  }

  cambiarPagina() {
    this.pageActual = 1;
  }

  filtrarCategorias() {
    if (this.categoria === 0) {
      this.cursos = this.cursosCompletos;
    } else {
      this.cursos = this.cursosCompletos.filter(
        (c) => c?.categoria_id === this.categoria
      );
    }
  }
}
