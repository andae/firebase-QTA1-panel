import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKatdiskusiComponent } from './add-katdiskusi.component';

describe('AddKatdiskusiComponent', () => {
  let component: AddKatdiskusiComponent;
  let fixture: ComponentFixture<AddKatdiskusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKatdiskusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKatdiskusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
