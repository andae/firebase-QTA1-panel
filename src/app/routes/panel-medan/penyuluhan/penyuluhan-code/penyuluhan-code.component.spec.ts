import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenyuluhanCodeComponent } from './penyuluhan-code.component';

describe('PenyuluhanCodeComponent', () => {
  let component: PenyuluhanCodeComponent;
  let fixture: ComponentFixture<PenyuluhanCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenyuluhanCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenyuluhanCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
