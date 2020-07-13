import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarDadosProprietarioComponent } from './salvar-dados-proprietario.component';

describe('SalvarDadosProprietarioComponent', () => {
  let component: SalvarDadosProprietarioComponent;
  let fixture: ComponentFixture<SalvarDadosProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarDadosProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarDadosProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
