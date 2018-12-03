import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskusiKategoriComponent } from './diskusi-kategori.component';

describe('DiskusiKategoriComponent', () => {
  let component: DiskusiKategoriComponent;
  let fixture: ComponentFixture<DiskusiKategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskusiKategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskusiKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
