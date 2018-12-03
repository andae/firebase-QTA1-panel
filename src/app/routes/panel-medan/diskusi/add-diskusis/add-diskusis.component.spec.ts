import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiskusisComponent } from './add-diskusis.component';

describe('AddDiskusisComponent', () => {
  let component: AddDiskusisComponent;
  let fixture: ComponentFixture<AddDiskusisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiskusisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiskusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
