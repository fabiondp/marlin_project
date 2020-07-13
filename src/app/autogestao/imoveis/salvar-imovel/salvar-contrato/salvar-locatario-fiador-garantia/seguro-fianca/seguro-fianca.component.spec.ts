import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroFiancaComponent } from './seguro-fianca.component';

describe('SeguroFiancaComponent', () => {
  let component: SeguroFiancaComponent;
  let fixture: ComponentFixture<SeguroFiancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguroFiancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroFiancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
