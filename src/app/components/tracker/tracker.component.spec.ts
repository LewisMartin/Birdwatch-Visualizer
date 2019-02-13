import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerComponent } from './tracker.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { MaterialModule } from 'src/app/material';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule, ChartsModule],
      declarations: [ TrackerComponent, LoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
