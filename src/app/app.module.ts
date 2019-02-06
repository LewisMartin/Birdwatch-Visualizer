import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { TrackerComponent } from './components/tracker/tracker.component';

import { BirdwatchDataService } from './services/birdwatch-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OverviewComponent,
    BreakdownComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    BirdwatchDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
