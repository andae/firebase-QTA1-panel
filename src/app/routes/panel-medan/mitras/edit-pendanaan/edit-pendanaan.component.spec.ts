import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPendanaanComponent } from './edit-pendanaan.component';

describe('EditPendanaanComponent', () => {
  let component: EditPendanaanComponent;
  let fixture: ComponentFixture<EditPendanaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPendanaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPendanaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
