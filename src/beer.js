const dataStore = { beerz: []}

const helper1 = {
  set: () => {
    console.log("beers loaded");
    renderAllBeers()
  }
}

let proxy1 = new Proxy(dataStore, helper1)

class Beer {
  constructor(beer) {
    this.id = beer.id;
    this.name = beer.name;
    this.tagline = beer.tagline;
    this.firstBrewed = beer.first_brewed;
    this.description = beer.description;
    this.image = beer.image_url;
    this.foodPairing = beer.food_pairing;
    this.brewersTips = beer.brewers_tips;
    this.contributedBy = beer. contributed_by;
    this.quantity = Math.ceil((Math.random()) * 10)
    dataStore.beerz.push(this);
  }
}
