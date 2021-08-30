/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Se importa modulo del formulario Builder
 */
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Se importa el componente para realizar las pruebas
 */
import { NuevaSugerenciaComponent } from './nueva-sugerencia.component';

/**
 * Se comienza las pruebas con un describe general
 */

describe('NuevaSugerenciaComponent', () => {

  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: NuevaSugerenciaComponent;

  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<NuevaSugerenciaComponent>;
  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */

  beforeEach(async () => {

    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NuevaSugerenciaComponent],
      providers: [NgbActiveModal, FormBuilder],
    }).compileComponents();
  });

  /**
   * Se crea el componente antes de cada prueba
   */
  beforeEach(() => {

    /**
     * Se asigna el contenido de las pruebas a fixture
     */
    fixture = TestBed.createComponent(NuevaSugerenciaComponent);

    /**
     * Se instancia un componente de la configuracion anterior
     */
    component = fixture.componentInstance;
    /**
     * Se detectan los cambios realizados
     */
    fixture.detectChanges();
  });

  /**
   * Prueba para comprobar la creación del componente
   */
  it('should create', () => {

    /**
     * Comprobacion si esl componente se ha creado
     */
    expect(component).toBeTruthy();
  });
});
