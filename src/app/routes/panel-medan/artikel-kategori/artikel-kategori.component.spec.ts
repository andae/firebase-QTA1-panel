import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelKategoriComponent } from './artikel-kategori.component';

describe('ArtikelKategoriComponent', () => {
  let component: ArtikelKategoriComponent;
  let fixture: ComponentFixture<ArtikelKategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtikelKategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikelKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
