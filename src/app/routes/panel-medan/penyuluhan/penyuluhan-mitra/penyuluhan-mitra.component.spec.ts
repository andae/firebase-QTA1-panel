import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenyuluhanMitraComponent } from './penyuluhan-mitra.component';

describe('PenyuluhanMitraComponent', () => {
  let component: PenyuluhanMitraComponent;
  let fixture: ComponentFixture<PenyuluhanMitraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenyuluhanMitraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenyuluhanMitraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
