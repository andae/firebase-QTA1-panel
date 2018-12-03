import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileMitraComponent } from './update-profile-mitra.component';

describe('UpdateProfileMitraComponent', () => {
  let component: UpdateProfileMitraComponent;
  let fixture: ComponentFixture<UpdateProfileMitraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileMitraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileMitraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
