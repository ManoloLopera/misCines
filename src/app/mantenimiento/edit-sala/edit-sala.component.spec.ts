import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaComponent } from './edit-sala.component';

describe('EditSalaComponent', () => {
  let component: EditSalaComponent;
  let fixture: ComponentFixture<EditSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
