import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMitraComponent } from './view-mitra.component';

describe('ViewMitraComponent', () => {
  let component: ViewMitraComponent;
  let fixture: ComponentFixture<ViewMitraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMitraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMitraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
