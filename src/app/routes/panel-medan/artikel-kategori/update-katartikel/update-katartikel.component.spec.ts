import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKatartikelComponent } from './update-katartikel.component';

describe('UpdateKatartikelComponent', () => {
  let component: UpdateKatartikelComponent;
  let fixture: ComponentFixture<UpdateKatartikelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKatartikelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKatartikelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
