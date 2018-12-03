import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMitraComponent } from './update-mitra.component';

describe('UpdateMitraComponent', () => {
  let component: UpdateMitraComponent;
  let fixture: ComponentFixture<UpdateMitraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMitraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMitraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
