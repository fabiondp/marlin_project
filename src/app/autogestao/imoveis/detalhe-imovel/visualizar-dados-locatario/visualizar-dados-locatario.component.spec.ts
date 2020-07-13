import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosLocatarioComponent } from './visualizar-dados-locatario.component';

describe('VisualizarDadosLocatarioComponent', () => {
  let component: VisualizarDadosLocatarioComponent;
  let fixture: ComponentFixture<VisualizarDadosLocatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosLocatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
