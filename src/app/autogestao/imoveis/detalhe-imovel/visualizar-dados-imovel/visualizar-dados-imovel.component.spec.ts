import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosImovelComponent } from './visualizar-dados-imovel.component';

describe('VisualizarDadosImovelComponent', () => {
  let component: VisualizarDadosImovelComponent;
  let fixture: ComponentFixture<VisualizarDadosImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
