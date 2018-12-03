import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMitraIdComponent } from './update-mitra-id.component';

describe('UpdateMitraIdComponent', () => {
  let component: UpdateMitraIdComponent;
  let fixture: ComponentFixture<UpdateMitraIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMitraIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMitraIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
