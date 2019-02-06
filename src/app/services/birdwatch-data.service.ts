import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BirdwatchDataService {

  constructor(private _http: HttpClient) { }

  public getBirdwatchData()
  {
    return this._http.get('assets/datasource.json');
  }
}
