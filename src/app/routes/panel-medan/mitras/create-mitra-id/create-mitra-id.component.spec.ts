import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMitraIdComponent } from './create-mitra-id.component';

describe('CreateMitraIdComponent', () => {
  let component: CreateMitraIdComponent;
  let fixture: ComponentFixture<CreateMitraIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMitraIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMitraIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
