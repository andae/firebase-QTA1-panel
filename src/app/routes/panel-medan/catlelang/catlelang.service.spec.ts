import { TestBed, inject } from '@angular/core/testing';

import { CatlelangService } from './catlelang.service';

describe('CatlelangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatlelangService]
    });
  });

  it('should be created', inject([CatlelangService], (service: CatlelangService) => {
    expect(service).toBeTruthy();
  }));
});
