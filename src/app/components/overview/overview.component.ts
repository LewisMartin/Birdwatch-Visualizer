import { Component, OnInit } from '@angular/core';
import { Birdwatches } from 'src/app/models/Birdwatches';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  birdwatches: Birdwatches;

  constructor(private _dataService: BirdwatchDataService) { }

  ngOnInit() {
    this._dataService.getBirdwatchData().subscribe((data: Birdwatches) => {
      this.birdwatches = data;
      console.log(JSON.stringify(this.birdwatches));
    })
  }

}
