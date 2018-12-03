class DOMController {
  constructor() {
    this.beerList = document.getElementById('list-group')
    this.beerDetail = document.getElementById('beer-detail')
    this.editBeerHandlerRef = this.handleBeerEdit.bind(this) // store a reference for adding/removing event listener
    this.beerList.addEventListener('click', this.handleBeerClick.bind(this))
  }

  render() {
    this.beerList.innerHTML = Beer.renderList()
  }

  handleBeerClick(e) {
    if (e.target.dataset.id) {
      // find save button and remove any existing event handlers
      let saveButton = this.beerDetail.querySelector('#edit-beer')
      if (saveButton)
        saveButton.removeEventListener('click', this.editBeerHandlerRef)

      const beer = Beer.find(e.target.dataset.id) // I'm keeping all state info in Beer.all instead of making a GET request for beer details
      this.beerDetail.innerHTML = beer.renderDetail()
      saveButton = this.beerDetail.querySelector('#edit-beer')
      saveButton.addEventListener('click', this.editBeerHandlerRef)
    }
  }

  handleBeerEdit(e) {
    const beer = Beer.find(e.target.dataset.id)
    const description = this.beerDetail.querySelector('textarea').value
    beer.updateDescription(description)
  }

}