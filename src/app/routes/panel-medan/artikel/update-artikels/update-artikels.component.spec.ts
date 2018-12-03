import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArtikelsComponent } from './update-artikels.component';

describe('UpdateArtikelsComponent', () => {
  let component: UpdateArtikelsComponent;
  let fixture: ComponentFixture<UpdateArtikelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArtikelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArtikelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
