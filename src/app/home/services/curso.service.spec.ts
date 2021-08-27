import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CursoService } from './curso.service';

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(CursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
