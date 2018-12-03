import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePenyuluhanComponent } from './update-penyuluhan.component';

describe('UpdatePenyuluhanComponent', () => {
  let component: UpdatePenyuluhanComponent;
  let fixture: ComponentFixture<UpdatePenyuluhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePenyuluhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePenyuluhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
