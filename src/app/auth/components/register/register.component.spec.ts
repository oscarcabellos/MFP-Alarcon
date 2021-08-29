/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * Se importa dos modulos para poder realizar las pruebas
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Se importa el modulo de rutas estaticas
 */
import { Router } from '@angular/router';

/**
 * Se importa el componente para realizar las pruebas
 */

import { RegisterComponent } from './register.component';

/**
 * Se comienza las pruebas con un describe general
 */

describe('RegisterComponent', () => {
  /**
   * Se instancia al componente al cual se hara pruebas
   */
  let component: RegisterComponent;
  /**
   * Se instancia un fixture que contenido al componente
   */
  let fixture: ComponentFixture<RegisterComponent>;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */
  beforeEach(async () => {
    /**
     * Se configura el testbed
     */
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
    .compileComponents();
  });


  /**
   * Se crea el componente antes de cada prueba
   */
  beforeEach(() => {

    /**
     * Se asigna el contenido de las pruebas a fixture
     */
    fixture = TestBed.createComponent(RegisterComponent);

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
