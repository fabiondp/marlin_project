import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoPorImovelComponent } from './boleto-por-imovel.component';

describe('BoletoPorImovelComponent', () => {
  let component: BoletoPorImovelComponent;
  let fixture: ComponentFixture<BoletoPorImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoPorImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoPorImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
