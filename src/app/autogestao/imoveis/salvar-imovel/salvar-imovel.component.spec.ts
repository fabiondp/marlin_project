import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarImovelComponent } from './salvar-imovel.component';

describe('SalvarImovelComponent', () => {
  let component: SalvarImovelComponent;
  let fixture: ComponentFixture<SalvarImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
