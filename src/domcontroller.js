class DomController {
  constructor() {
    this.apiCommunicator = new ApiCommunicator
    this.beerList = document.querySelector('.list-group')
    this.beerMug = document.querySelector('#beer-detail')
    //events - to switch between optimistic and pesimistic render of beer details, uncomment line 7 and comment out line 9
    // this.beerList.addEventListener('click', this.showDetails.bind(this))
    this.beerMug.addEventListener('click', this.editBeer.bind(this))
    this.beerList.addEventListener('click', this.otherShowDetails.bind(this))

  }

  appendBeers(htmlArray) {
    const beerList = document.querySelector('.list-group')
    htmlArray.forEach(beerHtml => beerList.appendChild(beerHtml))
  }

  //pessimistic rendering w no fetch - Beer.all should hold the data
  showDetails(event) {
    this.beerMug.innerHTML = ''
    let beerDetail = Beer.all.find(beer => beer.id === parseInt(event.target.dataset.id))
    let beerCard = beerDetail.renderBeerDetails()
    this.beerMug.appendChild(beerCard)
  }

  //Begin optimistic render methods
  otherShowDetails(event) {
    this.beerMug.innerHTML = ''
    let id = parseInt(event.target.dataset.id)
    this.apiCommunicator.getSingleBeer(id)
    .then(data => {
      let beerCard = this.optRender(data)
      this.beerMug.appendChild(beerCard)
    })
  }

  //this is in the domcontroller since the above fetch is dealing with JSON data rather than an instance of the beer class
  optRender(data) {
    let beerCard = document.createElement('div')
    beerCard.className = 'beer-detail'
    beerCard.innerHTML = `
      <h1>${data.name}</h1>
      <img src=${data.image_url}
      <h3>${data.tagline}</h3>
      <textarea data-description="${data.id}">${data.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-id="${data.id}" data-action="edit">
        Save
      </button>
    `
    return beerCard
  }
  //end optimistic render methods

  editBeer(event) {
    if (event.target.dataset.action === 'edit') {
      let id = parseInt(event.target.dataset.id)
      let editedBeer = Beer.all.find(beer =>  beer.id === id)
      //V1 - this is a bit goofy, could simply add a dataset attr to the text area
      // const newDescr = Array.from(Array.from(document.querySelector('#beer-detail').children[0].children))[2].value
      // editedBeer.description = newDescr

      //now selects based on data-specific value
      const updatedDescr = document.querySelector(`[data-description="${id}"`).value
      editedBeer.description = updatedDescr
      this.apiCommunicator.updateBeers(id, editedBeer)
    }
  }

}
