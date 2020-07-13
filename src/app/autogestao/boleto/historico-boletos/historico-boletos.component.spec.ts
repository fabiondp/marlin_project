import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoBoletosComponent } from './historico-boletos.component';

describe('HistoricoBoletosComponent', () => {
  let component: HistoricoBoletosComponent;
  let fixture: ComponentFixture<HistoricoBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
