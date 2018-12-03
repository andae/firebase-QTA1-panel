import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKatdiskusiComponent } from './update-katdiskusi.component';

describe('UpdateKatdiskusiComponent', () => {
  let component: UpdateKatdiskusiComponent;
  let fixture: ComponentFixture<UpdateKatdiskusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKatdiskusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKatdiskusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
