import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeliculaComponent } from './edit-pelicula.component';

describe('EditPeliculaComponent', () => {
  let component: EditPeliculaComponent;
  let fixture: ComponentFixture<EditPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
