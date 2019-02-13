import { Birdwatches, BirdSpecies } from "src/app/models/Birdwatches";

export const DUMMY_BIRDWATCHES: Birdwatches = {
    birdWatches: [{
        id: 1,
        reference: '2018',
        sightings: [{
            species: BirdSpecies.Starling,
            count: 6
        },
        {
            species: BirdSpecies.Goldfinch,
            count: 2
        }]
    },
    {
        id: 2,
        reference: '2019',
        sightings: [{
            species: BirdSpecies.Starling,
            count: 2
        },
        {
            species: BirdSpecies.Goldfinch,
            count: 4
        },
        {
            species: BirdSpecies.Bluetit,
            count: 5
        }]
    }]
};

export const DUMMY_BIRDWATCH_STATS = {
    birdwatchCount: '2',
    overallSpeciesCount: '3',
    yearWithMostBirds: DUMMY_BIRDWATCHES.birdWatches[1].reference,
    yearWithMostSpecies: DUMMY_BIRDWATCHES.birdWatches[1].reference,
    mostCommonBird: BirdSpecies.Starling,
    firstBirdCount: 8,
    latestBirdCount: 11, 
}