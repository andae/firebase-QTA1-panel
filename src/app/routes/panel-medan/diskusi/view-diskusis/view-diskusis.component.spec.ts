import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiskusisComponent } from './view-diskusis.component';

describe('ViewDiskusisComponent', () => {
  let component: ViewDiskusisComponent;
  let fixture: ComponentFixture<ViewDiskusisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiskusisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiskusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
