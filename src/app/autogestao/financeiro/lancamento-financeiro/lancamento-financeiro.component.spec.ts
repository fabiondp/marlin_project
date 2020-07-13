import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoFinanceiroComponent } from './lancamento-financeiro.component';

describe('LancamentoFinanceiroComponent', () => {
  let component: LancamentoFinanceiroComponent;
  let fixture: ComponentFixture<LancamentoFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
