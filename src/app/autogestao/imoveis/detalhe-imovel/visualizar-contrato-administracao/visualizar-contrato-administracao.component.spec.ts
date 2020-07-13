import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarContratoAdministracaoComponent } from './visualizar-contrato-administracao.component';

describe('VisualizarContratoAdministracaoComponent', () => {
  let component: VisualizarContratoAdministracaoComponent;
  let fixture: ComponentFixture<VisualizarContratoAdministracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarContratoAdministracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarContratoAdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
