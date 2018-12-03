import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitrasComponent } from './mitras.component';

describe('MitrasComponent', () => {
  let component: MitrasComponent;
  let fixture: ComponentFixture<MitrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
