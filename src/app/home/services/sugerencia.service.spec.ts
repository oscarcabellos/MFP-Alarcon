import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SugerenciaService } from './sugerencia.service';

describe('SugerenciaService', () => {
  let service: SugerenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SugerenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
