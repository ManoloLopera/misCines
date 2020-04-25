import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneroComponent } from './edit-genero.component';

describe('EditGeneroComponent', () => {
  let component: EditGeneroComponent;
  let fixture: ComponentFixture<EditGeneroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGeneroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
