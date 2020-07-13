import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoContratoAnuncioComponent } from './termo-contrato-anuncio.component';

describe('TermoContratoAnuncioComponent', () => {
  let component: TermoContratoAnuncioComponent;
  let fixture: ComponentFixture<TermoContratoAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoContratoAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoContratoAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
