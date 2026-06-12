import { TestBed } from '@angular/core/testing';

import { Marca } from './marca';

describe('Marca', () => {
  let service: Marca;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Marca);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
