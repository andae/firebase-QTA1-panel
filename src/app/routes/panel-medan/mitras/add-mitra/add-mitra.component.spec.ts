import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMitraComponent } from './add-mitra.component';

describe('AddMitraComponent', () => {
  let component: AddMitraComponent;
  let fixture: ComponentFixture<AddMitraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMitraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMitraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
