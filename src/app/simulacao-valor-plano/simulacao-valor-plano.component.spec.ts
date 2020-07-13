import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoValorPlanoComponent } from './simulacao-valor-plano.component';

describe('SimulacaoValorPlanoComponent', () => {
  let component: SimulacaoValorPlanoComponent;
  let fixture: ComponentFixture<SimulacaoValorPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoValorPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacaoValorPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
