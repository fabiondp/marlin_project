import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoContratoAnaliseComponent } from './termo-contrato-analise.component';

describe('TermoContratoAnaliseComponent', () => {
  let component: TermoContratoAnaliseComponent;
  let fixture: ComponentFixture<TermoContratoAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoContratoAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoContratoAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
