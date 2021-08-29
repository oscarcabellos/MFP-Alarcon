/**
 * Se importa las fucnioes desde el core de angular
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa el compoenente de editar curso para realizar las pruebas
 */
import { EditarCursoComponent } from './editar-curso.component';

/**
 * Se describe el conjunto de pruebas que se van a realizar
 */
describe('EditarCursoComponent', () => {
  /**
   * Se crea un objeto a partir del componente para editar un curso
   */
  let component: EditarCursoComponent;

  /**
   * Se crea un objeto fixture con la referencia del componente de edición
   */
  let fixture: ComponentFixture<EditarCursoComponent>;

  /**
   * Se crea una función que será ejecutada antes de cada prueba realizada
   */
  beforeEach(async () => {
    /**
     * se incia el conjunto de pruebas con los modulos que se inicializarán
     */
    await TestBed.configureTestingModule({
      declarations: [EditarCursoComponent],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  /**
   * Función para iniciaa los objetos creados previamente
   */
  beforeEach(() => {
    /**
     * Se instancia el conjunto de pruebas
     */
    fixture = TestBed.createComponent(EditarCursoComponent);

    /**
     * Se instancia un componente de fixture
     */
    component = fixture.componentInstance;

    /**
     * Se detectan los cambios del fixture
     */
    fixture.detectChanges();
  });

  /**
   * Se comprueba la creación de la prueba
   */
  it('should create', () => {
    /**
     * Se valida que el componente haya sido creado
     */
    expect(component).toBeTruthy();
  });

  it('cerrar modal', () => {
    component.closeModal('cerrar');
  });

  it('cerrar modal hijo', () => {
    component.closeModalChild('cerrar');
  });
});
