// Declare global variables
const url = 'http://localhost:3000/beers'
let beerList;
let beerDetail;

// Initial runner
document.addEventListener('DOMContentLoaded', () => {
  beerList = document.getElementById('list-group')
  beerDetail = document.getElementById('beer-detail')
  getAllBeers()
})

// Build Beer List
function getAllBeers() {
  clearAllBeers() // In case this is loaded later when the beer list is full
  fetch(url)
  .then(res => res.json())
  .then(res => {
    res.forEach((item) => {
      const newBeer = new Beer(item)
      beerList.innerHTML += newBeer.renderBeerTab()
    })
    bindTabs()
  })
}

// Display beer detail
function bindTabs() {
  const beerTabs = Array.from(beerList.children)
  beerTabs.forEach((beerTab) => beerTab.addEventListener('click', displaySingleBeer))
}

function displaySingleBeer(event) {
  resetBeerListColors()
  highlightBeerLi(event.target)

  const selectedBeer = allBeers.find((beer) => {
    return beer.id == event.target.dataset.id
  })
  beerDetail.innerHTML = selectedBeer.renderBeerFull()
  bindSaveButton()
}

function resetBeerListColors() { // This is just some html styling stuff :P
  Array.from(beerList.children).forEach((beer) => {
    beer.style.color = ""
    beer.style.background = ""
  })
}

function highlightBeerLi(element) {
  element.style.background = "black"
  element.style.color = "white"
}

// Edit beer details
function bindSaveButton() {
  const saveButton = document.getElementById('edit-beer')
  saveButton.addEventListener('click', patchBeerDetails)
}

function patchBeerDetails(event) {
  const beerID = parseInt(event.target.dataset.id)
  const newBody = {description: document.querySelector('textarea').value}

  updateAllBeers(beerID, newBody)

  fetch(url + `/${beerID}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify(newBody)
  })
  .then(res => res.json())
  .then(res => console.log(res))
}

function updateAllBeers(id, description) {
  const editedBeer = allBeers.find((beer) => {
    return beer.id == id
  })
  editedBeer.description = description.description
}

// Dear Laura: woulda styled this more but I'm kinda brain dead today so I'm just finishing up :)
