import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosCondicoesUsoComponent } from './termos-condicoes-uso.component';

describe('TermosCondicoesUsoComponent', () => {
  let component: TermosCondicoesUsoComponent;
  let fixture: ComponentFixture<TermosCondicoesUsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosCondicoesUsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosCondicoesUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
