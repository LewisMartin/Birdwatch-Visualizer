import { Component, OnInit } from '@angular/core';
import { Birdwatches } from 'src/app/models/Birdwatches';
import { BirdwatchDataService } from 'src/app/services/birdwatch-data.service';

export interface BirdwatchYear {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  public birdwatchYearOptions: Array<BirdwatchYear> = new Array<BirdwatchYear>();
  public birdwatchData: Birdwatches;
  public initialYear: number;
  public selectedYearBirdCount: number;
  public selectedYearSpeciesCount: number;
  public pageInitialized: boolean = false;

  breakdownChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        //https://github.com/chartjs/Chart.js/issues/3236#issuecomment-304228960
        generateLabels: (chart) => {
          
          chart.legend.afterFit = function () {          
            this.lineWidths = this.lineWidths.map( () => this.width-12 );         
            this.options.labels.padding = 15;
            this.options.labels.boxWidth = 12;
          };

          var data = chart.data;

          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              var meta = chart.getDatasetMeta(0);
              var ds = data.datasets[0];
              var arc = meta.data[i];
              var custom = arc && arc.custom || {};
              var getValueAtIndexOrDefault = this.getValueAtIndexOrDefault;
              var arcOpts = chart.options.elements.arc;
              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
              var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
              
              return {
                text: label,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                index: i
              };
            });
          }
          return [];
        }
      }
    }
  }

  public breakdownChartLabels: Array<string>;
  public breakdownChartData: Array<number>;
  public breakdownChartType = 'doughnut';

  constructor(private _birdwatchDataService: BirdwatchDataService) { }

  ngOnInit() {
    this._birdwatchDataService.getBirdwatchData().subscribe((data: Birdwatches) => {
      this.birdwatchData = data;

      this.setInitialChartData();
      this.setYearOptions();
      this.updateAdditionalStats();

      this.pageInitialized = true;
    });
  }

  setInitialChartData() {
    let latestWatch = this.birdwatchData.birdWatches[this.birdwatchData.birdWatches.length-1];

    this.breakdownChartLabels = new Array<string>();
    this.breakdownChartData = new Array<number>();

    latestWatch.sightings.forEach((sighting) => {
      this.breakdownChartLabels.push(sighting.species);
      this.breakdownChartData.push(sighting.count);
    });

    this.initialYear = latestWatch.id;
  }

  setYearOptions(){
    this.birdwatchData.birdWatches.forEach(element => {
      this.birdwatchYearOptions.push({value: element.id, viewValue: element.reference});
    });
  }

  updateChartData(event) {
    this.breakdownChartLabels.length = 0;
    this.breakdownChartData = new Array<number>();

    let selectedWatch = this.birdwatchData.birdWatches.find(watch => watch.id === event.value);

    selectedWatch.sightings.forEach((sighting) => {
      this.breakdownChartLabels.push(sighting.species);
      this.breakdownChartData.push(sighting.count);
    });

    this.updateAdditionalStats();
  }

  updateAdditionalStats() {
    this.selectedYearBirdCount = 0;

    this.breakdownChartData.forEach((element) => {
      this.selectedYearBirdCount += element;
    }) 

    this.selectedYearSpeciesCount = this.breakdownChartLabels.length;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.value === o2.value && o1.viewValue === o2.viewValue;
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
