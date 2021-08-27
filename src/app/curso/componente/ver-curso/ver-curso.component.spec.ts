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
    component.obtenerUsuario(50);
  });

  it('listar cursos', () => {
    component.listarCursos(10, 10);
  });
  it('ver curso', () => {
    component.verCurso(40);
  });

  it('buscar categoria', () => {
    component.buscarCategoria(10);
  });

  it('listar curso usuario', () => {
    component.listarCursoUsuario(10, 10);
  });
});
