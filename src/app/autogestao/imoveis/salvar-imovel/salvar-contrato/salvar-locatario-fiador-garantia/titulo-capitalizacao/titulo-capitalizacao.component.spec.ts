import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloCapitalizacaoComponent } from './titulo-capitalizacao.component';

describe('TituloCapitalizacaoComponent', () => {
  let component: TituloCapitalizacaoComponent;
  let fixture: ComponentFixture<TituloCapitalizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TituloCapitalizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloCapitalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
