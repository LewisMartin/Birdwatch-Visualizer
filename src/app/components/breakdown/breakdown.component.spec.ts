import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownComponent } from './breakdown.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { MaterialModule } from 'src/app/material';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule, ChartsModule],
      declarations: [ BreakdownComponent, LoadingSpinnerComponent ]
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
});
