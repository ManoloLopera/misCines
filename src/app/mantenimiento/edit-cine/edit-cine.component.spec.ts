import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCineComponent } from './edit-cine.component';

describe('EditCineComponent', () => {
  let component: EditCineComponent;
  let fixture: ComponentFixture<EditCineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
