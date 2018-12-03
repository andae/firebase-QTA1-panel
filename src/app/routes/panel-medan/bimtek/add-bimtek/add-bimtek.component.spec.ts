import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBimtekComponent } from './add-bimtek.component';

describe('AddBimtekComponent', () => {
  let component: AddBimtekComponent;
  let fixture: ComponentFixture<AddBimtekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBimtekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBimtekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
