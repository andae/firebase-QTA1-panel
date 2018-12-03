import { TestBed, inject } from '@angular/core/testing';

import { UploadLelangService } from './upload-lelang.service';

describe('UploadLelangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadLelangService]
    });
  });

  it('should be created', inject([UploadLelangService], (service: UploadLelangService) => {
    expect(service).toBeTruthy();
  }));
});
