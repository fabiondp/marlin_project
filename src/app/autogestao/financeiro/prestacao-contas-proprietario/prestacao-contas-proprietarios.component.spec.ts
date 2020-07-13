import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacaoContasProprietariosComponent } from './prestacao-contas-proprietarios.component';

describe('PrestacaoContasProprietariosComponent', () => {
  let component: PrestacaoContasProprietariosComponent;
  let fixture: ComponentFixture<PrestacaoContasProprietariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrestacaoContasProprietariosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacaoContasProprietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
