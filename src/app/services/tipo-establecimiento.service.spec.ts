import { TestBed, inject } from '@angular/core/testing';

import { TipoEstablecimientoService } from './tipo-establecimiento.service';

describe('TipoEstablecimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoEstablecimientoService]
    });
  });

  it('should be created', inject([TipoEstablecimientoService], (service: TipoEstablecimientoService) => {
    expect(service).toBeTruthy();
  }));
});
