import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBerandaComponent } from './add-beranda.component';

describe('AddBerandaComponent', () => {
  let component: AddBerandaComponent;
  let fixture: ComponentFixture<AddBerandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBerandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
