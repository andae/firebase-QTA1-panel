import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPenyuluhanComponent } from './view-penyuluhan.component';

describe('ViewPenyuluhanComponent', () => {
  let component: ViewPenyuluhanComponent;
  let fixture: ComponentFixture<ViewPenyuluhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPenyuluhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPenyuluhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
