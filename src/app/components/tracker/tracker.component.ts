import { Component, OnInit, ViewChild } from '@angular/core';
import { Birdwatches, BirdSpecies } from 'src/app/models/Birdwatches';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  @ViewChild('trackerChart') trackerChart : BaseChartDirective;

  public birdwatchData: Birdwatches;
  public pageInitialized: boolean = false;

  trackerChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      onClick: (e, legendItem) => {      
        this.trackerChart.chart.data.datasets[legendItem.index].hidden = !this.trackerChart.chart.data.datasets[legendItem.index].hidden;
        this.trackerChart.chart.update();
      },
      labels: {
        generateLabels: (chart) => {
          
          chart.legend.afterFit = function () {          
            this.lineWidths = this.lineWidths.map( () => this.width-12 );         
            this.options.labels.padding = 15;
            this.options.labels.boxWidth = 12;
          };

          var data = chart.data;

          if (data.datasets.length) {
            return data.datasets.map((dataset, i) => {
              var meta = chart.getDatasetMeta(i);
              var arc = meta.dataset[i];
              var custom = arc && arc.custom || {};
              var getValueAtIndexOrDefault = this.getValueAtIndexOrDefault;
              var arcOpts = chart.options.elements.arc;

              dataset.borderColor = dataset.backgroundColor;

              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, i, arcOpts.backgroundColor);
              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, i, arcOpts.borderWidth);
              
              return {
                text: dataset.label,
                fillStyle: fill,
                strokeStyle: fill,
                lineWidth: bw,
                hidden: dataset.hidden,

                index: i
              };
            });
          }
          return [];
        }
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
        mode: 'index',
        intersect: false
    }
  }

  public trackerChartLabels: Array<string>;
  public trackerChartData: Array<any>;
  public trackerChartType = 'line';

  constructor(private _dataService: BirdwatchDataService) { }

  ngOnInit() {
    this._dataService.getBirdwatchData().subscribe((data: Birdwatches) => {
      this.birdwatchData = data;

      this.setChartData();

      this.pageInitialized = true;
    })
  }

  setChartData() {
    this.setChartLabels();
    this.setChartDatasets();
  }

  setChartLabels() {
    this.trackerChartLabels = new Array<string>();

    this.birdwatchData.birdWatches.forEach((birdwatch) => {
      this.trackerChartLabels.push(birdwatch.reference);
    });
  }

  setChartDatasets() {
    this.trackerChartData = new Array<any>();

    this.setYearTotalData();
    this.setPerSpeciesData();
  }

  setYearTotalData() {
    let totalBirdCount = new Array<number>();
    let totalSpeciesCount = new Array<number>();

    this.birdwatchData.birdWatches.forEach((birdwatch) => {
      let birdTotal = 0;
      let speciesTotal = 0;

      birdwatch.sightings.forEach((sighting) => {
        birdTotal += sighting.count;
        speciesTotal += 1;
      });

      totalBirdCount.push(birdTotal);
      totalSpeciesCount.push(speciesTotal);
    });

    this.trackerChartData.push({label: 'Total birds', data: totalBirdCount, fill: false, lineTension: 0, hidden: false});
    this.trackerChartData.push({label: 'Total species', data: totalSpeciesCount, fill: false, lineTension: 0, hidden: false});
  }

  setPerSpeciesData() {
    let species = Object.keys(BirdSpecies).map(key => BirdSpecies[key]);

    species.forEach((sp) => {
      let speciesCount = new Array<number>();

      this.birdwatchData.birdWatches.forEach((birdwatch) => {
        let sighting = birdwatch.sightings.find(sighting => sighting.species === sp);

        if(sighting !== null && sighting !== undefined) {
          speciesCount.push(sighting.count);
        } else {
          speciesCount.push(0);
        }
      });

      this.trackerChartData.push({label: sp, data: speciesCount, fill: false, lineTension: 0, hidden: true});
    });
  }

  isArray = Array.isArray ?
  function (obj) {
    return Array.isArray(obj);
  } :
  function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  getValueAtIndexOrDefault = (value, index, defaultValue) => {
    if (value === undefined || value === null) {
      return defaultValue;
    }

    if (this.isArray(value)) {
      return index < value.length ? value[index] : defaultValue;
    }

    return value;
  };
}
