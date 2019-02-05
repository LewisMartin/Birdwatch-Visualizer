import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './components/overview/overview.component';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [
  { path: '', children: [
    { 
      path: '',
      component: OverviewComponent,
    },
    {
      path: 'breakdown',
      component: BreakdownComponent,
    },
    {
      path: 'tracker',
      component: TrackerComponent,
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
