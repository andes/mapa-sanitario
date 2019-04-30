import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDeSaludComponent } from './centro-de-salud.component';

describe('CentroDeSaludComponent', () => {
  let component: CentroDeSaludComponent;
  let fixture: ComponentFixture<CentroDeSaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroDeSaludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroDeSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
