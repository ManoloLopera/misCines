import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPeliculaComponent } from './new-pelicula.component';

describe('NewPeliculaComponent', () => {
  let component: NewPeliculaComponent;
  let fixture: ComponentFixture<NewPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
