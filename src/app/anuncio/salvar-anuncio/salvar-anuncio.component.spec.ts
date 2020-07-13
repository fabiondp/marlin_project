import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarAnuncioComponent } from './salvar-anuncio.component';

describe('SalvarAnuncioComponent', () => {
  let component: SalvarAnuncioComponent;
  let fixture: ComponentFixture<SalvarAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
