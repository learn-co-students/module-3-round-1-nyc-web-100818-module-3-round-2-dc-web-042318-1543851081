const beerList = document.getElementById('list-group')
const detailDiv = document.getElementById('beer-detail')

const renderAllBeers = () => {
  beerList.innerHTML = ""
  dataStore.beerz.forEach(beer => {
    renderBeer(beer);
  })
}

const renderBeer = (beer) => {
  beerList.innerHTML += `
  <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
  `
}

const renderBeerDetails = (beer) => {
  detailDiv.innerHTML = "";
  detailDiv.innerHTML += `
  <h1>${beer.name}</h1>
  <img src="${beer.image}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
    Save
  </button>
  `
}

const editBeer = (beer, beerDescription) => {
  editApi(beer, beerDescription)
  beer.description = beerDescription;
  renderBeerDetails(beer)
  window.alert("Beer Description Saved 🍺")
}
