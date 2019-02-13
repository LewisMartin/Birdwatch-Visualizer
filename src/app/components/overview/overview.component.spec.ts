import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';
import { BirdwatchDataServiceMock } from 'src/app/mocks/birdwatch-data.service.mock';
import { DUMMY_BIRDWATCHES } from 'src/app/mocks/dummy-data/dummy-birdwatch-data';

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
});
