import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CloudBinaryService } from './cloud-binary.service';

describe('CloudBinaryService', () => {
  let service: CloudBinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(CloudBinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
