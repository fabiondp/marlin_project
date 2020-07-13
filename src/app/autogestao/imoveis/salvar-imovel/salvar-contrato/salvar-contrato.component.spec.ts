import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarContratoComponent } from './salvar-contrato.component';

describe('SalvarContratoComponent', () => {
  let component: SalvarContratoComponent;
  let fixture: ComponentFixture<SalvarContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
