import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaConvenioBancarioComponent } from './alerta-convenio-bancario.component';

describe('AlertaConvenioBancarioComponent', () => {
  let component: AlertaConvenioBancarioComponent;
  let fixture: ComponentFixture<AlertaConvenioBancarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaConvenioBancarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaConvenioBancarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
