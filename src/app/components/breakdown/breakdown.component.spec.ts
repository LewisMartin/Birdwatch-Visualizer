import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownComponent } from './breakdown.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { MaterialModule } from 'src/app/material';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';
import { BirdwatchDataServiceMock } from 'src/app/mocks/birdwatch-data.service.mock';
import { DUMMY_BIRDWATCHES } from 'src/app/mocks/dummy-data/dummy-birdwatch-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule, ChartsModule, BrowserAnimationsModule],
      declarations: [ BreakdownComponent, LoadingSpinnerComponent ],
      providers: [
        { provide: BirdwatchDataService, useClass: BirdwatchDataServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownComponent);
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
