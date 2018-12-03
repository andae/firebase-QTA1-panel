import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfostatistikComponent } from './infostatistik.component';

describe('InfostatistikComponent', () => {
  let component: InfostatistikComponent;
  let fixture: ComponentFixture<InfostatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfostatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfostatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
