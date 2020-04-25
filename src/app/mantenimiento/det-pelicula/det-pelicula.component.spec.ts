import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetPeliculaComponent } from './det-pelicula.component';

describe('DetPeliculaComponent', () => {
  let component: DetPeliculaComponent;
  let fixture: ComponentFixture<DetPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
