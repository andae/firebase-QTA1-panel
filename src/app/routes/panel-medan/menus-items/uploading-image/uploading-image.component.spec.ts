import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingImageComponent } from './uploading-image.component';

describe('UploadingImageComponent', () => {
  let component: UploadingImageComponent;
  let fixture: ComponentFixture<UploadingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
