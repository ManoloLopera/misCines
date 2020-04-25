import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCineComponent } from './new-cine.component';

describe('NewCineComponent', () => {
  let component: NewCineComponent;
  let fixture: ComponentFixture<NewCineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
