import { TestBed } from '@angular/core/testing';

import { PhotographeService } from './photographe.service';

describe('PhotographeService', () => {
  let service: PhotographeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotographeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
