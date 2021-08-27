/**
 * Se importa las librerias para realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa la libreria para el manejo de rutas
 */
import { Router } from '@angular/router';

/**
 * Se importa la lirbreria para el manejo dle modal
 */
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa el componente de ver entregas para realizar las pruebas
 */
import { VerEntregaTareaComponent } from './ver-entrega-tarea.component';

/**
 * Se describe el conjunto de pruebas que se realizaran
 */
describe('VerEntregaTareaComponent', () => {
  /**
   * Se crea un objeto del componente ver entrega
   */
  let component: VerEntregaTareaComponent;

  /**
   * Se crea un objeto fixture
   */
  let fixture: ComponentFixture<VerEntregaTareaComponent>;

  /**
   * Se inicializan las relaciones con otros modulos antes de cada prueba
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerEntregaTareaComponent],
      providers: [
        NgbActiveModal,
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
   * Se inicializa las variables necesarias para las pruebas
   */
  beforeEach(() => {
    /**
     * Se crea una instancia de la creación del componente
     */
    fixture = TestBed.createComponent(VerEntregaTareaComponent);

    /**
     * Se crea una instancia del componente
     */
    component = fixture.componentInstance;

    /**
     * Se detecta los cambios en el objeto fixture
     */
    fixture.detectChanges();
  });

  /**
   * Se comprueba la creación del componente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
