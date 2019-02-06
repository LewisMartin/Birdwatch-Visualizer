export class Birdwatches 
{
    birdWatches: Array<Birdwatch>;
}

export class Birdwatch 
{
    id: number;
    reference: string;
    sightings: Array<BirdSighting>;
}

export class BirdSighting
{
    constructor(public species: BirdSpecies, public count = 0) { }
}

export enum BirdSpecies 
{
    Starling = "Starling",
    Goldfinch = "Goldfinch",
    Bluetit = "Blue tit",
    Woodpigeon = "Woodpigeon",
    Magpie = "Magpie",
    Blackcap = "Blackcap",
    Goldcrest = "Goldcrest",
    Blackbird = "Blackbird",
    Coaltit = "Coal tit",
    Collareddove = "Collared dove",
    Dunnock = "Dunnock",
    Wren = "Wren",
    Chaffinch = "Chaffinch",
    Robin = "Robin",
    Housesparrow = "House sparrow",
    Jay = "Jay",
    Greattit = "Great tit",
    Longtailedtit = "Long-tailed tit",
    Chiffchaff = "Chiffchaff",
    Nuthatch = "Nuthatch",
    Songthrush = "Song thrush",
    Mistlethrush = "Mistle thrush",
    Redwing = "Redwing",
    Fieldfare = "Fieldfare",
    Piedwagtail = "Pied wagtail",
    Greywagtail = "Grey wagtail",
    Greatspottedwoodpecker = "Great spotted woodpecker",
    Greenwoodpecker = "Green woodpecker",
    Carrioncrow = "Carrion crow",
    Greenfinch = "Greenfinch",
    Lesserredpoll = "Lesser redpoll",
    Sparrowhawk = "Sparrowhawk",
    Stockdove = "Stock dove"
}