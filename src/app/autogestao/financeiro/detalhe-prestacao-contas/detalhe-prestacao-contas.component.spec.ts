import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePrestacaoContasComponent } from './detalhe-prestacao-contas.component';

describe('DetalhePrestacaoContasComponent', () => {
  let component: DetalhePrestacaoContasComponent;
  let fixture: ComponentFixture<DetalhePrestacaoContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhePrestacaoContasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePrestacaoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
