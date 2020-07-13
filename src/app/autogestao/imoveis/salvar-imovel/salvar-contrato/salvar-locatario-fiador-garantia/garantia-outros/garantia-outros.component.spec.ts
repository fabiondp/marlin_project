import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiaOutrosComponent } from './garantia-outros.component';

describe('GarantiaOutrosComponent', () => {
  let component: GarantiaOutrosComponent;
  let fixture: ComponentFixture<GarantiaOutrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarantiaOutrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiaOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
