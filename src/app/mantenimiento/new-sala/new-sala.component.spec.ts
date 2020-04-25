import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalaComponent } from './new-sala.component';

describe('NewSalaComponent', () => {
  let component: NewSalaComponent;
  let fixture: ComponentFixture<NewSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
