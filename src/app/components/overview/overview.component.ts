import { Component, OnInit } from '@angular/core';
import { Birdwatches } from 'src/app/models/Birdwatches';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public birdwatches: Birdwatches;
  public pageInitialized: boolean = false;

  public overviewStatistics: Array<[string, string]> = new Array<[string, string]>();
  public statsColourCodes: Array<string> = new Array<string>();

  constructor(private _dataService: BirdwatchDataService) { }

  ngOnInit() {
    this._dataService.getBirdwatchData().subscribe((data: Birdwatches) => {
      this.birdwatches = data;

      this.initStatistics();

      this.pageInitialized = true;
    })
  }

  initStatistics() {
    this.addCountOfWatches();
    this.addCountSpeciesRecorded();
    this.addMostSuccessfulBirdYear();
    this.addMostSuccessfulSpeciesYear();
    this.addMostCommonBird();
    this.addOverallBirdCountChange();

    this.generateStatsColours();
  }

  generateStatsColours() {
    this.overviewStatistics.forEach((stat) => {
      this.statsColourCodes.push("hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' + 
        (85 + 10 * Math.random()) + '%)');
    });
  }

  addCountOfWatches() {
    this.overviewStatistics.push(["years worth of data", this.birdwatches.birdWatches.length.toString()]);
  }

  addCountSpeciesRecorded() {
    var hashMap: Map<string, number> = new Map<string, number>();

    this.birdwatches.birdWatches.forEach((birdwatch) => {
      birdwatch.sightings.forEach((sighting) => {
        if(!hashMap.has(sighting.species)) { 
          hashMap.set(sighting.species, 0);
        }
      });
    });

    let speciesRecorded = Array.from(hashMap.keys());

    this.overviewStatistics.push(["total species", speciesRecorded.length.toString()]);
  }

  addMostSuccessfulBirdYear() {
    var highestCount = 0;
    var yearWithHighestCount = '';

    this.birdwatches.birdWatches.forEach((birdwatch) => {
      let thisCount = 0;

      birdwatch.sightings.forEach((sighting) => {
        thisCount += sighting.count;
      });

      if(thisCount > highestCount) {
        highestCount = thisCount;
        yearWithHighestCount = birdwatch.reference;
      }
    });

    this.overviewStatistics.push(["most birds recorded", yearWithHighestCount]);
  }

  addMostSuccessfulSpeciesYear() {
    var highestCount = 0;
    var yearWithHighestCount = '';

    this.birdwatches.birdWatches.forEach((birdwatch) => {
      let thisCount = birdwatch.sightings.length;

      if(thisCount > highestCount) {
        highestCount = thisCount;
        yearWithHighestCount = birdwatch.reference;
      }
    });

    this.overviewStatistics.push(["most species recorded", yearWithHighestCount]);
  }

  addMostCommonBird() {
    var hashMap: Map<string, number> = new Map<string, number>();

    this.birdwatches.birdWatches.forEach((birdwatch) => {
      birdwatch.sightings.forEach((sighting) => {
        if(hashMap.has(sighting.species) == false) { 
          hashMap.set(sighting.species, sighting.count);
          hashMap[sighting.species] = sighting.count
        } else {
          if(sighting.count > hashMap.get(sighting.species)) {
            hashMap[sighting.species] = sighting.count
          }
        }
      });
    });

    var mostCommonBird = Object.keys(hashMap).reduce((a, b) => hashMap[a] > hashMap[b] ? a : b);

    this.overviewStatistics.push(["most common bird", mostCommonBird]);
  }

  addOverallBirdCountChange() {
    var firstYearCount = 0;
    var latestYearCount = 0;
    var diff;

    this.birdwatches.birdWatches[0].sightings.forEach((sighting) => {
      firstYearCount += sighting.count;
    });

    this.birdwatches.birdWatches[this.birdwatches.birdWatches.length-1].sightings.forEach((sighting) => {
      latestYearCount += sighting.count;
    });

    if(latestYearCount >= firstYearCount){
      diff = (latestYearCount - firstYearCount)/firstYearCount * 100;
      this.overviewStatistics.push(["increase since 1st watch", Math.round(diff).toString() + '%']);
    } else {
      diff = (firstYearCount - latestYearCount)/firstYearCount * 100;
      this.overviewStatistics.push(["decrease since 1st watch", Math.round(diff).toString() + '%']);
    }
  }
}
