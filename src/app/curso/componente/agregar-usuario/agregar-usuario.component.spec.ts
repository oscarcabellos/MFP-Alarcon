/**
 * Se importa el modulo de http
 */
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';

/**
 * Se importa los modulos para la realización de las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa modulo del formulario reactivo
 */
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

/**
 * Se importa el modulo para el manejo de rutas del curso
 */
import { Router } from '@angular/router';
import { Usuario } from '../../modelo/usuario';
import { CursoService } from '../../servicios/curso.service';

/**
 * Se importa el componente para la realización de las pruebas
 */
import { AgregarUsuarioComponent } from './agregar-usuario.component';

/**
 * Se crea la descripción del contexto de pruebas
 */
describe('AgregarUsuarioComponent', () => {
  let component: AgregarUsuarioComponent;
  let fixture: ComponentFixture<AgregarUsuarioComponent>;

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
    fixture = TestBed.createComponent(AgregarUsuarioComponent);
    component = fixture.componentInstance;
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
  it('Agregar usuario a un curso', () => {
    component.agregarUsuario(5, 'prueba@prueba');
  });

  /**
   * Se valida que el correo ingresado es incorrecto
   */
  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo@gmail');
    component.validarCorreoIngresado();
  });

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

  it('Validar correo profesor', async () => {
    expect(
      component.validarCorreoIgualAProfesor('correo', 'correo')
    ).toBeTruthy();
  });

  it('Descargar lista de alumnos', async () => {
    component.descargarUsuarios(5);
  });

  it('Validar usuario agregado', async () => {
    let newUser = new Usuario();
    newUser.correo = 'correo@gmail';
    component.usuarios = [newUser];
    expect(component.validarUsuarioAgregado('correo@gmail')).toBeTruthy();
  });

  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2@gmail');
    component.validarCorreoIngresado();
  });

  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    let newUser = new Usuario();
    newUser.correo = 'correo2@gmail';
    component.usuarios = [newUser];
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2@gmail');
    component.validarCorreoIngresado();
  });

  it('Correo no valido', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.agregarForm.get('correoUsuario').setValue('correo2');
    component.validarCorreoIngresado();
  });

  it('Boton agregar', async () => {
    component.usuarioProfesor = true;
    component = fixture.componentInstance;
    const btn = fixture.debugElement.query(By.css('#btnAgregar'));
    btn.nativeElement.click();
  });
});
