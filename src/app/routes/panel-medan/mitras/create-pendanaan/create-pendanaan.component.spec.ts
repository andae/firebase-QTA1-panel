import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePendanaanComponent } from './create-pendanaan.component';

describe('CreatePendanaanComponent', () => {
  let component: CreatePendanaanComponent;
  let fixture: ComponentFixture<CreatePendanaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePendanaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePendanaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
