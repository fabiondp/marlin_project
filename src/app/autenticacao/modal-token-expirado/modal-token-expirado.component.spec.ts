import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTokenExpiradoComponent } from './modal-token-expirado.component';

describe('ModalTokenExpiradoComponent', () => {
  let component: ModalTokenExpiradoComponent;
  let fixture: ComponentFixture<ModalTokenExpiradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTokenExpiradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTokenExpiradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
