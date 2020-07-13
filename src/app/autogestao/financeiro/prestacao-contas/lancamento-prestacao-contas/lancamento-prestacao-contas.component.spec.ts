import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoPrestacaoContasComponent } from './lancamento-prestacao-contas.component';

describe('LancamentoPrestacaoContasComponent', () => {
  let component: LancamentoPrestacaoContasComponent;
  let fixture: ComponentFixture<LancamentoPrestacaoContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentoPrestacaoContasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoPrestacaoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
