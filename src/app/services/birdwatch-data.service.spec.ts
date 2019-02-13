import { TestBed } from '@angular/core/testing';

import { BirdwatchDataService } from './birdwatch-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('BirdwatchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: BirdwatchDataService = TestBed.get(BirdwatchDataService);
    expect(service).toBeTruthy();
  });
});
