import { TestBed } from '@angular/core/testing';

import { BirdwatchDataService } from './birdwatch-data.service';

describe('BirdwatchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BirdwatchDataService = TestBed.get(BirdwatchDataService);
    expect(service).toBeTruthy();
  });
});
