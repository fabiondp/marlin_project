import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarContratoAdministracaoComponent } from './salvar-contrato-administracao.component';

describe('SalvarContratoAdministracaoComponent', () => {
  let component: SalvarContratoAdministracaoComponent;
  let fixture: ComponentFixture<SalvarContratoAdministracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarContratoAdministracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarContratoAdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
