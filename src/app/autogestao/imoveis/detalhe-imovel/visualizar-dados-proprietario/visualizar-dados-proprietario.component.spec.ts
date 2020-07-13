import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosProprietarioComponent } from './visualizar-dados-proprietario.component';

describe('VisualizarDadosProprietarioComponent', () => {
  let component: VisualizarDadosProprietarioComponent;
  let fixture: ComponentFixture<VisualizarDadosProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
