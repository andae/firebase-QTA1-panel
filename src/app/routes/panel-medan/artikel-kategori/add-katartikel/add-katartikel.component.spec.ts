import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKatartikelComponent } from './add-katartikel.component';

describe('AddKatartikelComponent', () => {
  let component: AddKatartikelComponent;
  let fixture: ComponentFixture<AddKatartikelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKatartikelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKatartikelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
