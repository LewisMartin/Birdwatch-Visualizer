import { of } from "rxjs";
import { DUMMY_BIRDWATCHES } from "./dummy-data/dummy-birdwatch-data";

export class BirdwatchDataServiceMock {

    constructor() { }

    public getBirdwatchData() {
        return of(DUMMY_BIRDWATCHES);
    }
}