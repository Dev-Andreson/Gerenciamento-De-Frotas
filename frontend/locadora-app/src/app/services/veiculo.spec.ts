import { TestBed } from '@angular/core/testing';

import { Veiculo } from './veiculo';

describe('Veiculo', () => {
  let service: Veiculo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Veiculo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
