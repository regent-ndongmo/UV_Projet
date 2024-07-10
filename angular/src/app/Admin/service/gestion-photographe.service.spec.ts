import { TestBed } from '@angular/core/testing';

import { GestionPhotographeService } from './gestion-photographe.service';

describe('GestionPhotographeService', () => {
  let service: GestionPhotographeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPhotographeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
