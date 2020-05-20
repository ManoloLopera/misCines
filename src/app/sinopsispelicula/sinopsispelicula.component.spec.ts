import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinopsisPeliculaComponent } from './sinopsispelicula.component';

describe('SinopsispeliculaComponent', () => {
  let component: SinopsisPeliculaComponent;
  let fixture: ComponentFixture<SinopsisPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinopsisPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinopsisPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
