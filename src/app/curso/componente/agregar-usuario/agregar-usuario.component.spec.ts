import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AgregarUsuarioComponent } from './agregar-usuario.component';

describe('AgregarUsuarioComponent', () => {
  let component: AgregarUsuarioComponent;
  let fixture: ComponentFixture<AgregarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
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
        usuario_nombre: null,
        usuario_apellidos: null,
        password: null,
        correo: null,
        url: null,
      },
      {
        usuario_id: 2,
        usuario_nombre: null,
        usuario_apellidos: null,
        password: null,
        correo: null,
        url: null,
      },
    ];
    component.eliminarUsuario(1);
    expect(component.usuarios.length).toEqual(1);
  });

  it('Listar usuario de un curso', () => {
    component.listarUsuarios(435);
    expect(component.usuarios.length).toEqual(0);
  });

  it('Agregar usuario a un curso', () => {
    (<HTMLInputElement>document.getElementById('correo')).value =
      'correo@gmail.com';

    document.getElementById('btnAgregar').click();

    expect((<HTMLInputElement>document.getElementById('correo')).value).toEqual(
      ''
    );
  });
});
