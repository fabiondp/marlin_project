import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCobrancasComponent } from './historico-cobrancas.component';

describe('HistoricoCobrancasComponent', () => {
  let component: HistoricoCobrancasComponent;
  let fixture: ComponentFixture<HistoricoCobrancasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoCobrancasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoCobrancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
