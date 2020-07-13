import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaucaoComponent } from './caucao.component';

describe('CaucaoComponent', () => {
  let component: CaucaoComponent;
  let fixture: ComponentFixture<CaucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
