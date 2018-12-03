import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiskusisComponent } from './update-diskusis.component';

describe('UpdateDiskusisComponent', () => {
  let component: UpdateDiskusisComponent;
  let fixture: ComponentFixture<UpdateDiskusisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiskusisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiskusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
