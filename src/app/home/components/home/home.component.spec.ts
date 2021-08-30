import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/curso/modelo/categoria';
import { Sugerencia } from 'src/app/sugerencia/modelos/sugerencia';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('obtener categoria', () => {
    let categoria = new Categoria();
    categoria.categoria_id = 1;
    categoria.categoria_nombre = 'uno';
    component.categorias = [categoria];
    expect(component.obtenerCategoria(1)).toEqual('uno');
  });

  it('listar cursos', () => {
    component.listarCursos();
  });

  it('listar cursos', () => {
    let newSugerencia = new Sugerencia();
    newSugerencia.sugerencia_id = 1;
    component.sugerencias = [newSugerencia];
    component.listarVotos();
  });
});
