import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBerandaComponent } from './edit-beranda.component';

describe('EditBerandaComponent', () => {
  let component: EditBerandaComponent;
  let fixture: ComponentFixture<EditBerandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBerandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
