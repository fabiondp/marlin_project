import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirPrestacaoContasComponent } from './imprimir-prestacao-contas.component';

describe('ImprimirPrestacaoContasComponent', () => {
  let component: ImprimirPrestacaoContasComponent;
  let fixture: ComponentFixture<ImprimirPrestacaoContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirPrestacaoContasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirPrestacaoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
