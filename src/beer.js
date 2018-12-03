class Beer {
  constructor(body) {
    this.id = body.id
    this.name = body.name
    this.tagline = body.tagline
    this.first_brewed = body.first_brewed
    this.description = body.description
    this.image_url = body.image_url
    this.food_pairing = body.food_pairing
    this.brewers_tips = body.brewers_tips
    this.contributed_by = body.contributed_by
    allBeers.push(this)
  }

  renderBeerTab() {
    return `<li class="list-group-item" data-id='${this.id}'>${this.name}</li>`
  }

  renderBeerFull() {
    return `
    <h1>${this.name}</h1>
    <img src="${this.image_url}">
    <h3>${this.tagline}</h3>
    <textarea>${this.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id="${this.id}">Save</button>`
  }
}

let allBeers = []

function clearAllBeers() {
  allBeers = []
}
