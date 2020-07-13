import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarDadosContratoComponent } from './salvar-dados-contrato.component';

describe('SalvarDadosContratoComponent', () => {
  let component: SalvarDadosContratoComponent;
  let fixture: ComponentFixture<SalvarDadosContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarDadosContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarDadosContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
