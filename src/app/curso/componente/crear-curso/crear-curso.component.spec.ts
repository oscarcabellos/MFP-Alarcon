import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CrearCursoComponent } from './crear-curso.component';

describe('CrearCursoComponent', () => {
  let component: CrearCursoComponent;
  let fixture: ComponentFixture<CrearCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCursoComponent ],
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
    
    /* spyOn(component.categoriaService, 'listarCategorias').and.returnValue(of{categorias}); */
    component.listarCategorias();
    expect(component.categorias.length).toEqual(0);

  });
});
