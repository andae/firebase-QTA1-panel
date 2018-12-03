import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBimtekComponent } from './view-bimtek.component';

describe('ViewBimtekComponent', () => {
  let component: ViewBimtekComponent;
  let fixture: ComponentFixture<ViewBimtekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBimtekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBimtekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
