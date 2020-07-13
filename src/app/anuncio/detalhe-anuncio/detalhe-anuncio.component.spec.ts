import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheAnuncioComponent } from './detalhe-anuncio.component';

describe('DetalheAnuncioComponent', () => {
  let component: DetalheAnuncioComponent;
  let fixture: ComponentFixture<DetalheAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
