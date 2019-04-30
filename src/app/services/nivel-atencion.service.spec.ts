import { TestBed, inject } from '@angular/core/testing';

import { NivelAtencionService } from './nivel-atencion.service';

describe('NivelAtencionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NivelAtencionService]
    });
  });

  it('should be created', inject([NivelAtencionService], (service: NivelAtencionService) => {
    expect(service).toBeTruthy();
  }));
});
