import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDadosComponent } from './verificar-dados.component';

describe('VerificarDadosComponent', () => {
  let component: VerificarDadosComponent;
  let fixture: ComponentFixture<VerificarDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
