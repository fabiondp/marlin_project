import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarUsuarioComponent } from './salvar-usuario.component';

describe('SalvarUsuarioComponent', () => {
  let component: SalvarUsuarioComponent;
  let fixture: ComponentFixture<SalvarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
