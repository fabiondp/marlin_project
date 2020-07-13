import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarDadosImovelComponent } from './salvar-dados-imovel.component';

describe('SalvarDadosImovelComponent', () => {
  let component: SalvarDadosImovelComponent;
  let fixture: ComponentFixture<SalvarDadosImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarDadosImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarDadosImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
