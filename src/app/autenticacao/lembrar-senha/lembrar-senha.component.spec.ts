import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembrarSenhaComponent } from './lembrar-senha.component';

describe('LembrarSenhaComponent', () => {
  let component: LembrarSenhaComponent;
  let fixture: ComponentFixture<LembrarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembrarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembrarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
