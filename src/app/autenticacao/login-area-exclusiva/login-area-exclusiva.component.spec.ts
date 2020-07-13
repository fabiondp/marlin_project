import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAreaExclusivaComponent } from './login-area-exclusiva.component';

describe('LoginAreaExclusivaComponent', () => {
  let component: LoginAreaExclusivaComponent;
  let fixture: ComponentFixture<LoginAreaExclusivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAreaExclusivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAreaExclusivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
