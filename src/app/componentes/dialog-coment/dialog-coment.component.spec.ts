import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComentComponent } from './dialog-coment.component';

describe('DialogComentComponent', () => {
  let component: DialogComentComponent;
  let fixture: ComponentFixture<DialogComentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
