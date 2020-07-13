import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAnuncioComponent } from './relatorio-anuncio.component';

describe('RelatorioAnuncioComponent', () => {
  let component: RelatorioAnuncioComponent;
  let fixture: ComponentFixture<RelatorioAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
