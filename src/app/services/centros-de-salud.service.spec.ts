import { TestBed, inject } from '@angular/core/testing';

import { CentrosDeSaludService } from './centros-de-salud.service';

describe('CentrosDeSaludService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentrosDeSaludService]
    });
  });

  it('should be created', inject([CentrosDeSaludService], (service: CentrosDeSaludService) => {
    expect(service).toBeTruthy();
  }));
});
