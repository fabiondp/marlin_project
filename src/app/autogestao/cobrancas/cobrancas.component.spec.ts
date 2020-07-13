import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrancasComponent } from './cobrancas.component';

describe('CobrancasComponent', () => {
  let component: CobrancasComponent;
  let fixture: ComponentFixture<CobrancasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CobrancasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
