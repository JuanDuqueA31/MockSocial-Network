import { TestBed } from '@angular/core/testing';

import { DummyjsonService } from './dummyjson.service';

describe('DummyjsonService', () => {
  let service: DummyjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
