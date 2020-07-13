import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesBancariasComponent } from './informacoes-bancarias.component';

describe('InformacoesBancariasComponent', () => {
  let component: InformacoesBancariasComponent;
  let fixture: ComponentFixture<InformacoesBancariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesBancariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesBancariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
