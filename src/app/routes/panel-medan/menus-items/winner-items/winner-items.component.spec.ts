import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerItemsComponent } from './winner-items.component';

describe('WinnerItemsComponent', () => {
  let component: WinnerItemsComponent;
  let fixture: ComponentFixture<WinnerItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
