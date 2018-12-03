/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatlelangComponent } from './catlelang.component';

describe('CatlelangComponent', () => {
  let component: CatlelangComponent;
  let fixture: ComponentFixture<CatlelangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatlelangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlelangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
