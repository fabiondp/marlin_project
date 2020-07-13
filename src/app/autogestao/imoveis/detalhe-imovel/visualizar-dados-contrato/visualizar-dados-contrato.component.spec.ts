import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosContratoComponent } from './visualizar-dados-contrato.component';

describe('VisualizarDadosContratoComponent', () => {
  let component: VisualizarDadosContratoComponent;
  let fixture: ComponentFixture<VisualizarDadosContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
