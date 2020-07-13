import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloContratoComponent } from './modelo-contrato.component';

describe('ModeloContratoComponent', () => {
  let component: ModeloContratoComponent;
  let fixture: ComponentFixture<ModeloContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
