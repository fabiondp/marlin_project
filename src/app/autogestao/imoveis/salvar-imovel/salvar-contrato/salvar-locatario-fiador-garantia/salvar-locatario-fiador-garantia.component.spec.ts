import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarLocatarioFiadorGarantiaComponent } from './salvar-locatario-fiador-garantia.component';

describe('SalvarLocatarioFiadorGarantiaComponent', () => {
  let component: SalvarLocatarioFiadorGarantiaComponent;
  let fixture: ComponentFixture<SalvarLocatarioFiadorGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarLocatarioFiadorGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarLocatarioFiadorGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
