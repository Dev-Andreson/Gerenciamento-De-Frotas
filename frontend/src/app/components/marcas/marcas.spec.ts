import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marcas } from './marcas';

describe('Marcas', () => {
  let component: Marcas;
  let fixture: ComponentFixture<Marcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Marcas],
    }).compileComponents();

    fixture = TestBed.createComponent(Marcas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
