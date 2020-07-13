import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoContratoComponent } from './historico-contrato.component';

describe('HistoricoContratoComponent', () => {
  let component: HistoricoContratoComponent;
  let fixture: ComponentFixture<HistoricoContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
