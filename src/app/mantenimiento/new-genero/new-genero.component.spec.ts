import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeneroComponent } from './new-genero.component';

describe('NewGeneroComponent', () => {
  let component: NewGeneroComponent;
  let fixture: ComponentFixture<NewGeneroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGeneroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
