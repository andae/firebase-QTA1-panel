import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtikelsComponent } from './add-artikels.component';

describe('AddArtikelsComponent', () => {
  let component: AddArtikelsComponent;
  let fixture: ComponentFixture<AddArtikelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArtikelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtikelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
