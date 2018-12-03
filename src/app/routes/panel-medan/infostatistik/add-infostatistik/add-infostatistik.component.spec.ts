import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfostatistikComponent } from './add-infostatistik.component';

describe('AddInfostatistikComponent', () => {
  let component: AddInfostatistikComponent;
  let fixture: ComponentFixture<AddInfostatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfostatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfostatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
