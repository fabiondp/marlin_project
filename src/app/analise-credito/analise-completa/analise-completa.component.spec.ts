import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseCompletaComponent } from './analise-completa.component';

describe('AnaliseCompletaComponent', () => {
  let component: AnaliseCompletaComponent;
  let fixture: ComponentFixture<AnaliseCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
