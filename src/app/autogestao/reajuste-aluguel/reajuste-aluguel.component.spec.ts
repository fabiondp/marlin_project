import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReajusteAluguelComponent } from './reajuste-aluguel.component';

describe('ReajusteAluguelComponent', () => {
  let component: ReajusteAluguelComponent;
  let fixture: ComponentFixture<ReajusteAluguelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReajusteAluguelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReajusteAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
