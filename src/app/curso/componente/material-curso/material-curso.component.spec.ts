/**
 * Se importa los componente para la realización de las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa el componente al cual se realizara las pruebas
 */
import { MaterialCursoComponent } from './material-curso.component';

/**
 * Se describe como se realizaran las pruebas
 */
describe('MaterialCursoComponent', () => {
  /**
   * Se crea un nuevo obtejo del material del curso
   */
  let component: MaterialCursoComponent;

  /**
   * Se crea un objeto fixture relacionado con el material del curso
   */
  let fixture: ComponentFixture<MaterialCursoComponent>;

  /**
   * Se hace la configuración para las pruebas del componente
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialCursoComponent],
    }).compileComponents();
  });

  /**
   * Se inicializa los objetos dle componente
   */
  beforeEach(() => {
    /**
     * Se incializa la creacion de un fixture
     */
    fixture = TestBed.createComponent(MaterialCursoComponent);

    /**
     * Se incializa el componente para la realización de las pruebas
     */
    component = fixture.componentInstance;

    /**
     * Se detecta los cambios del objeto fixture
     */
    fixture.detectChanges();
  });

  /**
   * Se prueba la creación del compoennte
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open modal', () => {
    component.openModal();
  });
});
