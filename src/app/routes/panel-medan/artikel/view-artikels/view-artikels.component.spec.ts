import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtikelsComponent } from './view-artikels.component';

describe('ViewArtikelsComponent', () => {
  let component: ViewArtikelsComponent;
  let fixture: ComponentFixture<ViewArtikelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArtikelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArtikelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
