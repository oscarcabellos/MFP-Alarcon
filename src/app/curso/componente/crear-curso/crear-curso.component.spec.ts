import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Curso } from '../../modelo/curso';
import { CategoriaService } from '../../servicios/categoria.service';

import { CrearCursoComponent } from './crear-curso.component';

describe('CrearCursoComponent', () => {
  let component: CrearCursoComponent;
  let fixture: ComponentFixture<CrearCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCursoComponent ],
      /* Se importa el HttpClientModule para la verificacion del servicio 'CursoService'  */
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Listar categorias', () => {
    
    component.listarCategorias();
    expect(component.categorias.length).toEqual(0);
  });

  it('Listar categorias total', inject( [CategoriaService] , (categoriaService) => {
    categoriaService.listarCategorias().subscribe(result => 
      expect(result.length).toBeGreaterThan(0));
  }));

  it('Listar categorias total' , () => {
    let curso= new Curso();
/*     component.cursoForm.get()

    component.cargarDatosCurso(curso);

    expect(component.cargarDatosCurso(curso)).toHaveClass(curso); */
    
  });

});
