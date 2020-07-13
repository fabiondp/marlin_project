import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarConvenioComponent } from './salvar-convenio.component';

describe('SalvarConvenioComponent', () => {
  let component: SalvarConvenioComponent;
  let fixture: ComponentFixture<SalvarConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalvarConvenioComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
