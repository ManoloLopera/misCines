import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasUsuarioComponent } from './facturas-usuario.component';

describe('FacturasUsuarioComponent', () => {
  let component: FacturasUsuarioComponent;
  let fixture: ComponentFixture<FacturasUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
