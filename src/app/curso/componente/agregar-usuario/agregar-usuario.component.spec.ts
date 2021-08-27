/**
 * Se importa el modulo de http
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa los modulos para la realización de las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa modulo del formulario reactivo
 */
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Se importa el modulo para el manejo de rutas del curso
 */
import { Router } from '@angular/router';
import { Usuario } from '../../modelo/usuario';

/**
 * Se importa el componente para la realización de las pruebas
 */
import { AgregarUsuarioComponent } from './agregar-usuario.component';

/**
 * Se crea la descripción del contexto de pruebas
 */
describe('AgregarUsuarioComponent', () => {
  /**
   * Se crea el objeto del componente
   */
  let component: AgregarUsuarioComponent;

  /**
   * Se creo un objeto de la clase fixture
   */
  let fixture: ComponentFixture<AgregarUsuarioComponent>;

  /**
   * Se crea función que se ejecutara antes de cada prueba
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    }).compileComponents();
  });

  /**
   * Se crea la implementacion antes de cada llamada
   */
  beforeEach(() => {
    /**
     * Se crea la instancia de fixture
     */
    fixture = TestBed.createComponent(AgregarUsuarioComponent);

    /**
     * Se crea un componente a probar
     */
    component = fixture.componentInstance;

    /**
     * Se detecta los cambios de fixture
     */
    fixture.detectChanges();
  });

  /**
   * Se comprueba que el componente haya sido creado
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Se comprueba la eliminación de un usuario del curso
   */
  it('Eliminar usuario del curso', () => {
    component.usuarios = [];
    component.eliminarUsuario(1);
    expect(component.usuarios.length).toEqual(0);
  });

  /**
   * Se lista los usuarios de un curso
   */
  it('Listar usuario de un curso', async () => {
    await component.listarUsuarios(435);
    expect(component.usuarios.length).toEqual(0);
  });

  /**
   * Se agrega un usuario a un curso
   */
  /* it('Agregar usuario a un curso', () => {
    (<HTMLInputElement>document.getElementById('correo')).value =
      'correo@gmail.com';

    document.getElementById('btnAgregar').click();

    expect((<HTMLInputElement>document.getElementById('correo')).value).toEqual(
      'correo@gmail.com'
    );
  }); */

  /**
   * Se valida que el correo ingresado es incorrecto
   */
  /* it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    component.usuarios = [];
    let numeroUsuarios = component.usuarios.length;
    (<HTMLInputElement>document.getElementById('correo')).value =
      'correo@gmail.com';

    document.getElementById('btnAgregar').click();
    sessionStorage.setItem('correo', 'correo@gmail.com');

    component.validarCorreoIngresado();
    expect(component.usuarios.length).toEqual(numeroUsuarios);
  }); */

  /**
   * Comprobar el estado de un usuario activo
   */
  it('Comprobar el estado de un usuario activo', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 1;
    expect(component.obtenerEstado(userTest)).toEqual('Activo');
  });

  /**
   * Comprobar el estado de un usuario pendiente
   */
  it('Comprobar el estado de un usuario pendiente', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 3;
    expect(component.obtenerEstado(userTest)).toEqual('Pendiente');
  });

  /**
   * Comprobar el estado de un usuario denegado
   */
  it('Comprobar el estado de un usuario denegado', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 2;
    expect(component.obtenerEstado(userTest)).toEqual('Denegado');
  });

  /**
   * Comprobar el estado de un usuario pendiente
   */
  it('Comprobar el estado de un usuario pendiente', async () => {
    let userTest = new Usuario();
    userTest.situacion_id = 5;
    expect(component.obtenerEstado(userTest)).toEqual('Pendiente');
  });
});
