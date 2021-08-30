/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
/**
 * Se importa modulo del formulario Builder
 */
import { FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

/**
 * Se importa el componente Categoria para la realización de las pruebas
 */
import { Categoria } from 'src/app/curso/modelo/categoria';
/**
 * Se importa el componente Usuario para la realización de las pruebas
 */
import { Usuario } from 'src/app/curso/modelo/usuario';
/**
 * Se importa el componente Sugerencia para la realización de las pruebas
 */
import { Sugerencia } from '../../modelos/sugerencia';

/**
 * Se importa el componente  para la realización de las pruebas
 */
import { ListaSugerenciaComponent } from './lista-sugerencia.component';

/**
 * Se crea la descripción del contexto de pruebas
 */
describe('ListaSugerenciaComponent', () => {
    /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: ListaSugerenciaComponent;
  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<ListaSugerenciaComponent>;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */
  beforeEach(async () => {

    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [ListaSugerenciaComponent],
      imports: [HttpClientModule, NgxPaginationModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  /**
   * Se crea el componente antes de cada prueba
   */
  beforeEach(() => {
    /**
     * Se asigna el contenido de las pruebas a fixture
     */
    fixture = TestBed.createComponent(ListaSugerenciaComponent);
    /**
     * Se instancia un componente de la configuracion anterior
     */
    component = fixture.componentInstance;
    /**
     * Se detectan los cambios realizados
     */
    fixture.detectChanges();
  });

  /**
   * Prueba para comprobar la creación del componente
   */
  it('should create', () => {

    /**
     * Comprobacion si el componente se ha creado
     */
    expect(component).toBeTruthy();
  });

  /**
   * Se comprueba si se abrio el modal de nueva sugerencia
   */

  it('abrir modal de neva sugerencia', () => {
    component.openModal();
  });

  /**
   * Se comprueba si se obtuvo el nombre de la categoria
   */

  it('obtener el nombre de la categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_nombre = 'uno';
    categoriaTest.categoria_id = 1;
    component.categorias = [categoriaTest];
    expect(component.getNombreCategoria(1)).toEqual('uno');
  });


  /**
   * Se comprueba si se obtuvo el nombre de la cateogira indefinida
   */
  it('obtener el nombre de la categoria undefined', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_nombre = 'uno';
    categoriaTest.categoria_id = 1;
    component.categorias = [categoriaTest];
    expect(component.getNombreCategoria(undefined)).toEqual(
      'Categoria no definida'
    );
  });

  /**
   * Se comprueba el cambio de pagina
   */
  it('cambiar de pagina', () => {
    component.pageActual = 10;
    component.cambiarPagina();
    expect(component.pageActual).toEqual(1);
  });

  /**
   * Se comprueba la actualizacion de la categoria
   */
  it('actualizar categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_id = 0;
    component.actualizarCategoria(categoriaTest);
  });

  /**
   * Se comprueba la actualizacion de la categoria
   */
  it('actualizar categoria', () => {
    let categoriaTest = new Categoria();
    categoriaTest.categoria_id = 1;
    let sugerenciaTest = new Sugerencia();
    sugerenciaTest.sugerencia_id = 1;
    component.sugerenciasIniciales = [sugerenciaTest];
    component.actualizarCategoria(categoriaTest);
  });

  /**
   * Se comprueba si se obtiene voto
   */
  it('obtener voto', () => {
    let newUser = new Usuario();
    component.usuariosVotos = [newUser];
    component.obtenerVotoUsuario(1);
  });

  /**
   * Se comprueba la obtencion de la cantidad de votos indefinidos
   */

  it('obtener cantidad de votos undefined', () => {
    component.sugerenciasVotos = [
      { 'COUNT(sugerencia_id)': 2, sugerencia_id: 2 },
    ];
    component.obtenerCantidadVotos(1);
  });

  /**
   * Se comprueba la obtencion de la cantidad de votos
   */
  it('obtener cantidad de votos ', () => {
    component.sugerenciasVotos = [
      { 'COUNT(sugerencia_id)': 2, sugerencia_id: 1 },
    ];
    component.obtenerCantidadVotos(1);
  });

  /**
   * Se comprueba el listado de votos por usuario
   */
  it('listar votos usuario', () => {
    component.listarVotosUsuarios(5);
  });

  /**
   * Se comprueba la creacion de componente
   */
  it('crear componente', () => {
    sessionStorage.setItem('usuario_id', '5');
    component = fixture.componentInstance;
  });

  /**
   * Se comprueba el cambio de estado
   */
  it('cambiar estado', () => {
    component.cambiarEstado(5);
  });
});
