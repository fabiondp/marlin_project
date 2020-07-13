import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCobrancaComponent } from './detalhe-cobranca.component';

describe('DetalheCobrancaComponent', () => {
  let component: DetalheCobrancaComponent;
  let fixture: ComponentFixture<DetalheCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
