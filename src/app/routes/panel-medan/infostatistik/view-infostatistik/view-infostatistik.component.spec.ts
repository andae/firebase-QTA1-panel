import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfostatistikComponent } from './view-infostatistik.component';

describe('ViewInfostatistikComponent', () => {
  let component: ViewInfostatistikComponent;
  let fixture: ComponentFixture<ViewInfostatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInfostatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInfostatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
