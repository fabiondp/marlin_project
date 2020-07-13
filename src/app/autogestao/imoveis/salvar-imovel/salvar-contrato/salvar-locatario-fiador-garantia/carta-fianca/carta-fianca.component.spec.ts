import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaFiancaComponent } from './carta-fianca.component';

describe('CartaFiancaComponent', () => {
  let component: CartaFiancaComponent;
  let fixture: ComponentFixture<CartaFiancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaFiancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaFiancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
