import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTaxaAdministracaoComponent } from './modal-editar-taxa-administracao.component';

describe('ModalEditarTaxaAdministracaoComponent', () => {
  let component: ModalEditarTaxaAdministracaoComponent;
  let fixture: ComponentFixture<ModalEditarTaxaAdministracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarTaxaAdministracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTaxaAdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
