/**
 * Se importa el modulo de http para realizar consultas
 */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

/**
 * Se importa el componente para realizar las pruebas
 */

import { SugerenciaService } from './sugerencia.service';

/**
 * Se comienza las pruebas con un describe general
 */

describe('SugerenciaService', () => {

  /**
   * Se instancia el service al cual se hara pruebas
   */
  let service: SugerenciaService;

  /**
   * Se realiza la llamada a las funciones que se inicializaran antes de cada prueba
   */

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(SugerenciaService);
  });

  /**
   * Prueba para comprobar la creación del service
   */
  it('should be created', () => {

    /**
     * Comprobacion si el service se ha creado
     */
    expect(service).toBeTruthy();
  });
});
