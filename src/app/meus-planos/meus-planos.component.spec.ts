import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPlanosComponent } from './meus-planos.component';

describe('MeusPlanosComponent', () => {
  let component: MeusPlanosComponent;
  let fixture: ComponentFixture<MeusPlanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusPlanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
