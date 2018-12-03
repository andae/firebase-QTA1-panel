import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPenyuluhanComponent } from './add-penyuluhan.component';

describe('AddPenyuluhanComponent', () => {
  let component: AddPenyuluhanComponent;
  let fixture: ComponentFixture<AddPenyuluhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPenyuluhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPenyuluhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
