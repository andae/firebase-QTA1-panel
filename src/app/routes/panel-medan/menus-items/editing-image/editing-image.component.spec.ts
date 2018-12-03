import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingImageComponent } from './editing-image.component';

describe('EditingImageComponent', () => {
  let component: EditingImageComponent;
  let fixture: ComponentFixture<EditingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
