import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoContratoAutogestaoComponent } from './termo-contrato-autogestao.component';

describe('TermoContratoAutogestaoComponent', () => {
  let component: TermoContratoAutogestaoComponent;
  let fixture: ComponentFixture<TermoContratoAutogestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoContratoAutogestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoContratoAutogestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
