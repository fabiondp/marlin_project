import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheContratoComponent } from './detalhe-contrato.component';

describe('DetalheContratoComponent', () => {
  let component: DetalheContratoComponent;
  let fixture: ComponentFixture<DetalheContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
