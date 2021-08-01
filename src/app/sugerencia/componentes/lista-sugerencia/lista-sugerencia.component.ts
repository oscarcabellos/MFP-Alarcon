import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { NuevaSugerenciaComponent } from '../nueva-sugerencia/nueva-sugerencia.component';
import { SugerenciaService } from '../../servicios/sugerencia.service';
import { Sugerencia } from '../../modelos/sugerencia';
import { CategoriaService } from 'src/app/curso/servicios/categoria.service';
import { Categoria } from 'src/app/curso/modelo/categoria';

@Component({
  selector: 'app-lista-sugerencia',
  templateUrl: './lista-sugerencia.component.html',
  styleUrls: ['./lista-sugerencia.component.css'],
})
export class ListaSugerenciaComponent implements OnInit {
  categorias: Categoria[] = [];
  sugerencias: Sugerencia[];
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  sugerenciaFiltro: string = '';

  constructor(
    private modalService: NgbModal,
    private sugerenciaService: SugerenciaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.listarSugerencias();
    this.listarCategorias();
  }

  /**
   * Método para abrir el modal de una nueva sugerencia
   */
  openModal() {
    const modalRef = this.modalService.open(NuevaSugerenciaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {};
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        // Intencional
      },
      (reason) => {
        // Intencional
      }
    );
  }

  /**
   * Método para cambiar la votación
   * @param id Identificador de la sugerencia
   */
  cambiarEstado(id: number) {
    document.getElementById(`favorito${id}`).classList.toggle('presionado');
  }

  /**
   * Método para filtrar la busqueda por la categoria seleccionada
   * @param id {Number} - Identiicador de la categoria
   */
  actualizarCategoria(id) {
    alert(id);
  }

  /**
   * Método para listar las sugerencias
   */
  listarSugerencias() {
    this.sugerenciaService.listarSugerencias().subscribe((x) => {
      this.sugerencias = x['list'];
    });
  }

  /**
   * Método para listar las categorias
   */
  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }

  /**
   * Método para devolver el nombre de la categoria
   * @param idCategoria {Number} - Identificado de la vategoria
   * @returns Nombre de la categoria
   */
  getNombreCategoria(idCategoria: number) {
    if (idCategoria === undefined) return 'Categoria no definida';
    const nombreCategoria = this.buscarNombreCategoria(idCategoria);
    return nombreCategoria === undefined
      ? 'Nombre no encontrado'
      : nombreCategoria;
  }

  /**
   * Método para buscar el nombre de la categoria
   * @param id {Number} - Identificador de la categoria
   * @returns Nombre de la categoria
   */
  buscarNombreCategoria(id: number) {
    const resultado = this.categorias.find((c) => c?.categoria_id === id);
    return resultado?.categoria_nombre;
  }

  /**
   * Método para reiniciar el numero de página
   */
  cambiarPagina() {
    this.pageActual = 1;
  }
}
