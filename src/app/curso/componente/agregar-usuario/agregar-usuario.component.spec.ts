import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AgregarUsuarioComponent } from './agregar-usuario.component';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Eliminar usuario del curso', () => {
    component.usuarios = [
      {
        usuario_id: 1,
        usuario_nombre: 'nombre',
        usuario_apellidos: 'apellido',
        password: 'password',
        correo: 'correo',
        url: 'url',
        situacion: 1,
        descripcion: 'descripcion',
      },
      {
        usuario_id: 2,
        usuario_nombre: 'nombre',
        usuario_apellidos: 'apellido',
        password: 'password',
        correo: 'correo',
        url: 'url',
        situacion: 1,
        descripcion: 'descripcion',
      },
    ];
    component.eliminarUsuario(1);
    expect(component.usuarios.length).toEqual(1);
  });

  it('Listar usuario de un curso', async () => {
    await component.listarUsuarios(435);
    expect(component.usuarios.length).toEqual(0);
  });

  it('Agregar usuario a un curso', () => {
    (<HTMLInputElement>document.getElementById('correo')).value =
      'correo@gmail.com';

    document.getElementById('btnAgregar').click();

    expect((<HTMLInputElement>document.getElementById('correo')).value).toEqual(
      'correo@gmail.com'
    );
  });

  it('Validar que el correo ingresado no sea el mismo que el usuario registrado', () => {
    component.usuarios = [
      {
        usuario_id: 1,
        usuario_nombre: 'nombre',
        usuario_apellidos: 'apellido',
        password: 'password',
        correo: 'correo',
        url: 'url',
        situacion: 1,
        descripcion: 'descripcion',
      },
      {
        usuario_id: 2,
        usuario_nombre: 'nombre',
        usuario_apellidos: 'apellido',
        password: 'password',
        correo: 'correo',
        url: 'url',
        situacion: 1,
        descripcion: 'descripcion',
      },
    ];
    let numeroUsuarios = component.usuarios.length;
    (<HTMLInputElement>document.getElementById('correo')).value =
      'correo@gmail.com';

    document.getElementById('btnAgregar').click();
    sessionStorage.setItem('correo', 'correo@gmail.com');

    component.validarCorreoIngresado();
    expect(component.usuarios.length).toEqual(numeroUsuarios);
  });
});
