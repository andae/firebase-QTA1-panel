import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfostatistikComponent } from './update-infostatistik.component';

describe('UpdateInfostatistikComponent', () => {
  let component: UpdateInfostatistikComponent;
  let fixture: ComponentFixture<UpdateInfostatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfostatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfostatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
