import { TestBed, inject } from '@angular/core/testing';

import { BerandaService } from './beranda.service';

describe('BerandaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BerandaService]
    });
  });

  it('should be created', inject([BerandaService], (service: BerandaService) => {
    expect(service).toBeTruthy();
  }));
});
