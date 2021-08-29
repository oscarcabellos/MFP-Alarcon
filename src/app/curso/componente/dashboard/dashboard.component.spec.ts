/**
 * Se importa los modulos para realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa el modulo de rutas estaticas
 */
import { Router } from '@angular/router';

/**
 * Se importa el componente para realizar las pruebas
 */
import { DashboardComponent } from './dashboard.component';

/**
 * Se comienza la descripción de las pruebas
 */
describe('DashboardComponent', () => {
  /**
   * Se crea un componente de la prueba
   */
  let component: DashboardComponent;

  /**
   * se crear un fixture del componente
   */
  let fixture: ComponentFixture<DashboardComponent>;

  /**
   * Se crea una funcion que sera llamada antes de la ejecución de cada prueba
   */
  beforeEach(async () => {
    /**
     * Se importan los modulos necesarios para el componente
     */
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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

  /**
   * Se crea las instancias a utulizar durante las pruebas
   */
  beforeEach(() => {
    /**
     * Se instancia un fixture del componente
     */
    fixture = TestBed.createComponent(DashboardComponent);

    /**
     * Se crea una instancia del compoente dashboard
     */
    component = fixture.componentInstance;

    /**
     * Se detectan los cambios en el fixture
     */
    fixture.detectChanges();
  });

  /**
   * Se prueba la creacion del componente dashboard
   */
  it('should create', () => {
    /**
     * Se valida la creación del componente
     */
    expect(component).toBeTruthy();
  });

  it('cerrar sesión', () => {
    component.logout();
  });
});
