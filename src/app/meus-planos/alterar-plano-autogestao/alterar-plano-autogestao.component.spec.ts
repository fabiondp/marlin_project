import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarPlanoAutogestaoComponent } from './alterar-plano-autogestao.component';

describe('AlterarPlanoAutogestaoComponent', () => {
  let component: AlterarPlanoAutogestaoComponent;
  let fixture: ComponentFixture<AlterarPlanoAutogestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarPlanoAutogestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarPlanoAutogestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
