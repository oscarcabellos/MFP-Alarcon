import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Curso } from '../../modelo/curso';

import { ListaCursoComponent } from './lista-curso.component';

describe('ListaCursoComponent', () => {
  let component: ListaCursoComponent;
  let fixture: ComponentFixture<ListaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCursoComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cambiar de pagina', () => {
    component.pageActual = 5;
    component.cambiarPagina();
    expect(component.pageActual).toEqual(1);
  });

  it('mostrar codigo del curso', () => {
    let cursoTest = new Curso();
    cursoTest.codigo = 'ASFS234';
    component.mostrarCodigo(cursoTest);
  });

  it('descargar lista de alumnos', () => {
    component.descargarlista(10);
  });

  it('abrir modal de editar curso', () => {
    let cursoTest = new Curso();
    component.editarCurso(cursoTest);
  });

  it('unirse curso', () => {
    component.unirseCurso();
  });
});
