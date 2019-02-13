import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';
import { BirdwatchDataServiceMock } from 'src/app/mocks/birdwatch-data.service.mock';
import { DUMMY_BIRDWATCHES, DUMMY_BIRDWATCH_STATS } from 'src/app/mocks/dummy-data/dummy-birdwatch-data';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule],
      declarations: [ OverviewComponent, LoadingSpinnerComponent ],
      providers: [
        { provide: BirdwatchDataService, useClass: BirdwatchDataServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate birdwatch data on init', () => {
    component.ngOnInit();

    expect(component.birdwatchData).toBe(DUMMY_BIRDWATCHES);
  });

  it('should correctly determine bird watch count on init', () => {
    component.ngOnInit();

    expect(component.overviewStatistics[0][1]).toBe(DUMMY_BIRDWATCH_STATS.birdwatchCount);
  });

  it('should correctly determine species count on init', () => {
    component.ngOnInit();

    expect(component.overviewStatistics[1][1]).toBe(DUMMY_BIRDWATCH_STATS.overallSpeciesCount);
  });

  it('should correctly determine best bird year on init', () => {
    component.ngOnInit();

    expect(component.overviewStatistics[2][1]).toBe(DUMMY_BIRDWATCH_STATS.yearWithMostBirds);
  });

  it('should correctly determine best species year on init', () => {
    component.ngOnInit();

    expect(component.overviewStatistics[3][1]).toBe(DUMMY_BIRDWATCH_STATS.yearWithMostSpecies);
  });

  it('should correctly determine most common bird on init', () => {
    component.ngOnInit();

    expect(component.overviewStatistics[4][1]).toBe(DUMMY_BIRDWATCH_STATS.mostCommonBird);
  });

  it('should correctly determine bird decline or increase on init', () => {
    var birdChange = DUMMY_BIRDWATCH_STATS.latestBirdCount > DUMMY_BIRDWATCH_STATS.firstBirdCount ? 
                      Math.round(((DUMMY_BIRDWATCH_STATS.latestBirdCount - DUMMY_BIRDWATCH_STATS.firstBirdCount)/DUMMY_BIRDWATCH_STATS.firstBirdCount * 100)).toString() + '%' : 
                      Math.round(((DUMMY_BIRDWATCH_STATS.firstBirdCount - DUMMY_BIRDWATCH_STATS.latestBirdCount)/DUMMY_BIRDWATCH_STATS.firstBirdCount * 100)).toString() + '%';
    
    component.ngOnInit();

    expect(component.overviewStatistics[5][1]).toBe(birdChange);
  });
});
