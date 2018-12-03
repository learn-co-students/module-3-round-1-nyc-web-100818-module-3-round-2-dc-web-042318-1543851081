class Beer {

  constructor(beer) {
    this.id = beer.id
    this.name = beer.name
    this.tagline = beer.tagline
    this.first_brewed = beer.first_brewed
    this.description = beer.description
    this.image_url = beer.image_url
    this.food_pairing = beer.food_pairing
    Beer.all.push(this)
  }

  static renderAll() {
    return Beer.all.map( drink => drink.render()).join(' ')
  }

  render() {
    return `
    <ul class="list-group" id="list-group">
      <li id="${this.id}" class="list-group-item">${this.name}</li>
    </ul>
    `
  }

  static renderDetailAll() {
    return Beer.all.map( drink => drink.renderDetail()).join(' ')
  }

  renderDetail() {
    return
    `<div id="beer-detail" >
         <h1>${this.name}</h1>
         <img src="<${this.image_url}>">
          <h3>${this.tagline}</h3>
          <textarea>${this.description}</textarea>
          <button id="edit-beer" class="btn btn-info">
            Save
          </button>
        </div>`
  }





  // render() {
  //   return
  //   `<ul class="list-group">
  //      <li class="list-group-item">${this.name}</li>
  //    </ul>`,
  //    `<div id="beer-detail" >
  //      <h1>${this.name}</h1>
  //      <img src="<${this.image_url}>">
  //      <h3>${this.tagline}</h3>
  //      <textarea>${this.description}</textarea>
  //      <button id="edit-beer" class="btn btn-info">
  //        Save
  //      </button>
  //    </div>`
  // }



  // <h1>Beer Name</h1>
  // <img src="<add beer img url here>">
  // <h3>Beer Tagline</h3>
  // <textarea>Beer Description</textarea>
  // <button id="edit-beer" class="btn btn-info">
  //   Save
  // </button>

  //


}

Beer.all = [];
