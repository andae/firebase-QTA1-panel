import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBerandaComponent } from './view-beranda.component';

describe('ViewBerandaComponent', () => {
  let component: ViewBerandaComponent;
  let fixture: ComponentFixture<ViewBerandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBerandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
