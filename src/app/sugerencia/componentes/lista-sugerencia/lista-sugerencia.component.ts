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
  categorias: Categoria[] = [
    {
      categoria_id: 0,
      categoria_nombre: 'Todas las categorias',
      categoria_estado: null,
      categoria_fecha_creacion: null,
    },
  ];
  sugerenciasIniciales: Sugerencia[];
  sugerencias: Sugerencia[];
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean;
  sugerenciaFiltro: string;
  usuarioRegistrado: boolean;

  fakeVotacionesEstado = [
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
  ];
  constructor(
    private readonly modalService: NgbModal,
    private readonly sugerenciaService: SugerenciaService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.pageActual = 1;
    this.responsive = true;
    this.sugerenciaFiltro = '';
    this.usuarioRegistrado = +sessionStorage.getItem('usuario_id') !== 0;
    console.log(this.usuarioRegistrado);

    this.listarSugerencias();
    this.listarCategorias();
  }

  /**
   * Función para abrir el modal de una nueva sugerencia
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
   * Función para cambiar la votación
   * @param id Identificador de la sugerencia
   */
  cambiarEstado(id: number) {
    this.fakeVotacionesEstado[id] = !this.fakeVotacionesEstado[id];
  }

  /**
   * Función para filtrar la busqueda por la categoria seleccionada
   * @param id {Number} - Identiicador de la categoria
   */
  actualizarCategoria(categoria) {
    if (categoria?.categoria_id === 0) {
      this.sugerencias = this.sugerenciasIniciales;
    } else {
      this.sugerencias = this.sugerenciasIniciales.filter(
        (c) => c?.categoria_id === categoria?.categoria_id
      );
    }
  }

  /**
   * Función para listar las sugerencias
   */
  listarSugerencias() {
    this.sugerenciaService.listarSugerencias().subscribe((x) => {
      this.sugerencias = x['list'];
      this.sugerenciasIniciales = x['list'];
    });
  }

  /**
   * Función para listar las categorias
   */
  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe(
        (x) => (this.categorias = this.categorias.concat(x['categories']))
      );
  }

  /**
   * Función para devolver el nombre de la categoria
   * @param idCategoria {Number} - Identificado de la vategoria
   * @returns Nombre de la categoria
   */
  getNombreCategoria(idCategoria: number) {
    if (idCategoria === undefined) {
      return 'Categoria no definida';
    }
    const nombreCategoria = this.buscarNombreCategoria(idCategoria);
    return nombreCategoria === undefined
      ? 'Nombre no encontrado'
      : nombreCategoria;
  }

  /**
   * Función para buscar el nombre de la categoria
   * @param id {Number} - Identificador de la categoria
   * @returns Nombre de la categoria
   */
  buscarNombreCategoria(id: number) {
    const resultado = this.categorias.find((c) => c?.categoria_id === id);
    return resultado?.categoria_nombre;
  }

  /**
   * Función para reiniciar el numero de página
   */
  cambiarPagina() {
    this.pageActual = 1;
  }
}
