import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBuscaCepComponent } from './input-busca-cep.component';

describe('InputBuscaCepComponent', () => {
  let component: InputBuscaCepComponent;
  let fixture: ComponentFixture<InputBuscaCepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBuscaCepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBuscaCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
