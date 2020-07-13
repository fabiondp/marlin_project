import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoProprietarioComponent } from './historico-proprietario.component';

describe('HistoricoProprietarioComponent', () => {
  let component: HistoricoProprietarioComponent;
  let fixture: ComponentFixture<HistoricoProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
