import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletosGeradosComponent } from './boletos-gerados.component';

describe('BoletosGeradosComponent', () => {
  let component: BoletosGeradosComponent;
  let fixture: ComponentFixture<BoletosGeradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletosGeradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletosGeradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
