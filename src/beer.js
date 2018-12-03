class Beer {
  constructor(beer) {
    this.id = beer.id
    this.name = beer.name
    this.tagline = beer.tagline
    this.description = beer.description
    this.image_url = beer.image_url
    this.food_pairing = beer.food_pairing
    this.brewers_tips = beer.brewers_tips
    this.contributed_by = beer.contributed_by
    Beer.all.push(this)
  }

  static renderAll() {
    return Beer.all.map(beer => beer.renderBeer())
  }

  renderBeer() {
    let li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = `${this.name}`
    li.dataset.id = this.id
    return li
  }

  renderBeerDetails() {
    let beerCard = document.createElement('div')
    beerCard.className = 'beer-detail'
    beerCard.innerHTML = `
      <h1>${this.name}</h1>
      <img src=${this.image_url}
      <h3>${this.tagline}</h3>
      <textarea>${this.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-id="${this.id}" data-action="edit">
        Save
      </button>
    `
    return beerCard
  }

}

Beer.all = []
