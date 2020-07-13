import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaQualidadeComponent } from './politica-qualidade.component';

describe('PoliticaQualidadeComponent', () => {
  let component: PoliticaQualidadeComponent;
  let fixture: ComponentFixture<PoliticaQualidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaQualidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaQualidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
