import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Categoria } from 'src/app/curso/modelo/categoria';
import { Usuario } from 'src/app/curso/modelo/usuario';
import { Sugerencia } from '../../modelos/sugerencia';

import { ListaSugerenciaComponent } from './lista-sugerencia.component';

describe('ListaSugerenciaComponent', () => {
  let component: ListaSugerenciaComponent;
  let fixture: ComponentFixture<ListaSugerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaSugerenciaComponent],
      imports: [HttpClientModule, NgxPaginationModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('abrir modal de neva sugerencia', () => {
    component.openModal();
  });

  it('obtener el nombre de la categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_nombre = 'uno';
    categoriaTest.categoria_id = 1;
    component.categorias = [categoriaTest];
    expect(component.getNombreCategoria(1)).toEqual('uno');
  });

  it('obtener el nombre de la categoria undefined', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_nombre = 'uno';
    categoriaTest.categoria_id = 1;
    component.categorias = [categoriaTest];
    expect(component.getNombreCategoria(undefined)).toEqual(
      'Categoria no definida'
    );
  });

  it('cambiar de pagina', () => {
    component.pageActual = 10;
    component.cambiarPagina();
    expect(component.pageActual).toEqual(1);
  });

  it('actualizar categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_id = 0;
    component.actualizarCategoria(categoriaTest);
  });

  it('actualizar categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_id = 1;
    let sugerenciaTest = new Sugerencia();
    sugerenciaTest.sugerencia_id = 1;
    component.sugerenciasIniciales = [sugerenciaTest];
    component.actualizarCategoria(categoriaTest);
  });

  it('obtener voto', () => {
    let newUser = new Usuario();
    component.usuariosVotos = [newUser];
    component.obtenerVotoUsuario(1);
  });

  it('obtener cantidad de votos undefined', () => {
    component.sugerenciasVotos = [
      { 'COUNT(sugerencia_id)': 2, sugerencia_id: 2 },
    ];
    component.obtenerCantidadVotos(1);
  });

  it('obtener cantidad de votos ', () => {
    component.sugerenciasVotos = [
      { 'COUNT(sugerencia_id)': 2, sugerencia_id: 1 },
    ];
    component.obtenerCantidadVotos(1);
  });

  it('listar votos usuario', () => {
    component.listarVotosUsuarios(5);
  });

  it('crear componente', () => {
    sessionStorage.setItem('usuario_id', '5');
    component = fixture.componentInstance;
  });

  it('cambiar estado', () => {
    component.cambiarEstado(5);
  });
});
