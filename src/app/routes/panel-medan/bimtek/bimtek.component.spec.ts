import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BimtekComponent } from './bimtek.component';

describe('BimtekComponent', () => {
  let component: BimtekComponent;
  let fixture: ComponentFixture<BimtekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BimtekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BimtekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
