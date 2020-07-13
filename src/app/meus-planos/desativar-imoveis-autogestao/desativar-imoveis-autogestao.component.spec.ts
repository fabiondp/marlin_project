import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesativarImoveisAutogestaoComponent } from './desativar-imoveis-autogestao.component';

describe('DesativarImoveisAutogestaoComponent', () => {
  let component: DesativarImoveisAutogestaoComponent;
  let fixture: ComponentFixture<DesativarImoveisAutogestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesativarImoveisAutogestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesativarImoveisAutogestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
