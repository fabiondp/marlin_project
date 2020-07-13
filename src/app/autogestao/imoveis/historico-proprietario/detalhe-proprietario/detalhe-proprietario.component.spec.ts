import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheProprietarioComponent } from './detalhe-proprietario.component';

describe('DetalheProprietarioComponent', () => {
  let component: DetalheProprietarioComponent;
  let fixture: ComponentFixture<DetalheProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
