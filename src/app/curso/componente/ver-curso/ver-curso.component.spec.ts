import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { VerCursoComponent } from './ver-curso.component';

describe('VerCursoComponent', () => {
  let component: VerCursoComponent;
  let fixture: ComponentFixture<VerCursoComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VerCursoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
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
    fixture = TestBed.createComponent(VerCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('obtener usuario', () => {
    component.obtenerUsuario(5);
  });

  it('listar cursos', () => {
    component.listarCursos(15, 15);
  });
  it('ver curso', () => {
    component.verCurso(45);
  });

  it('buscar categoria', () => {
    component.buscarCategoria(15);
  });

  it('listar curso usuario', () => {
    component.listarCursoUsuario(15, 15);
  });

  it('listar curso usuario', () => {
    sessionStorage.setItem('correo', 'correo@gmail');
    component.unirCurso(15, 1, 55);
  });

  it('listar curso usuario con invitacion', () => {
    sessionStorage.setItem('correo', 'correo@gmail');

    component.unirCurso(15, 5, 55);
  });
});
