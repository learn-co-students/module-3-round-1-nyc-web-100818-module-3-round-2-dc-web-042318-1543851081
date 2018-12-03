class Beer {
  constructor({ id, name, tagline, first_brewed, description, image_url, food_pairing, brewers_tips, contributed_by }) {
    this.id = id
    this.name = name
    this.tagline = tagline
    this.first_brewed = first_brewed
    this.description = description
    this.image_url = image_url
    this.food_pairing = food_pairing
    this.brewers_tips = brewers_tips
    this.contributed_by = contributed_by
    Beer.all.push(this)
  }

  updateDescription(description) {
    this.description = description
    return Beer.adapter.patch(this.id, { description: description })
  }

  renderDetail() {
    return `<h1>${this.name}</h1>
            <img src="${this.image_url}">
            <h3>${this.tagline}</h3>
            <textarea>${this.description}</textarea>
            <button data-id="${this.id}" id="edit-beer" class="btn btn-info">
              Save
            </button>`
  }

  renderListItem() {
    return `<li style="cursor: pointer;" data-id="${this.id}" class="list-group-item">${this.name}</li>`
  }

  static sortBy(key) {
    Beer.all.sort((a,b) => {
      if (a[key] < b[key]) {
        return -1
      } else if (a[key] > b[key]) {
        return 1
      } else {
        return 0
      }
    })
  }
  
  static create(beerObj) {
    return Beer.adapter.post(beerObj)
      .then(beerObj => new Beer(beerObj))
  }

  static findOrCreate(beerObj) {
    return Beer.all.find(b => b.id == beerObj.id) || Beer.create(beerObj)
  }

  static find(id) {
    return Beer.all.find(b => b.id == id)
  }

  static renderList() {
    return Beer.all.map(b => b.renderListItem()).join('')
  }

  static populateFromAPI() {
    return Beer.adapter.getAll()
      .then(json => {
        json.forEach(beerObj => {
          new Beer(beerObj)
        })
      })
      .catch(console.error)
  }

  static populateFromRemoteAPI() {
    return Beer.remoteAdapter.getRandom()
      .then(beerObj => Beer.findOrCreate(beerObj[0]))
  }
}

Beer.all = []
Beer.adapter = new JSONAPIAdapter('http://localhost:3000/beers')
Beer.remoteAdapter = new PunkAPIAdapter()