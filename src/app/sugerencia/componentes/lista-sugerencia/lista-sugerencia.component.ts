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

  cambiarEstado(id: number) {
    document.getElementById(`favorito${id}`).classList.toggle('presionado');
  }

  actualizarCategoria(c) {
    alert(c);
  }

  listarSugerencias() {
    this.sugerenciaService.listarSugerencias().subscribe((x) => {
      this.sugerencias = x['list'];
    });
  }

  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x['categories']));
  }

  getNombreCategoria(idCategoria: number) {
    if (idCategoria === undefined) return 'Categoria no definida';
    const nombreCategoria = this.buscarNombreCategoria(idCategoria);
    return nombreCategoria === undefined
      ? 'Nombre no encontrado'
      : nombreCategoria;
  }

  buscarNombreCategoria(id: number) {
    const resultado = this.categorias.find((c) => c?.categoria_id === id);
    return resultado?.categoria_nombre;
  }

  cambiarPagina() {
    this.pageActual = 1;
  }
}
