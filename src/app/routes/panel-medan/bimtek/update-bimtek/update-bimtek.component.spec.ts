import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBimtekComponent } from './update-bimtek.component';

describe('UpdateBimtekComponent', () => {
  let component: UpdateBimtekComponent;
  let fixture: ComponentFixture<UpdateBimtekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBimtekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBimtekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
