import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosCondicoesUsoTextoComponent } from './termos-condicoes-uso-texto.component';

describe('TermosCondicoesUsoTextoComponent', () => {
  let component: TermosCondicoesUsoTextoComponent;
  let fixture: ComponentFixture<TermosCondicoesUsoTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosCondicoesUsoTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosCondicoesUsoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
