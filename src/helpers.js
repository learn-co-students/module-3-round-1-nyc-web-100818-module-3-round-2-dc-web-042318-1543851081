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
  const foodPairing = beer.foodPairing;
  detailDiv.innerHTML = "";
  detailDiv.innerHTML += `
  <h1>${beer.name}</h1>
  <img src="${beer.image}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <p><strong>Quantity</strong>: ${beer.quantity}</p>
  <p><strong>First Brewed</strong>: ${beer.firstBrewed}</p>
  <p><strong>Brewers Tips</strong>: ${beer.brewersTips}</p>
  <p><strong>Contributed By</strong>: ${beer.contributedBy}</p>
  <p><strong>Recommended Food Pairing</strong>:
  <ul class="food-pairing">
  </ul
  </p>
  <button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
    Save
  </button>
  <button id="delete-beer" data-id="${beer.id}" class="btn btn-info" style="background-color:red">
    Drink
  </button>
  `
  const pairingList = detailDiv.querySelector('.food-pairing')
  foodPairing.forEach(food => {
    pairingList.innerHTML += `
    <li>${food}</li>
    `
  })
}

const editBeer = (beer, beerDescription) => {
  editApi(beer, beerDescription)
  beer.description = beerDescription;
  renderBeerDetails(beer)
  window.alert("Beer Description Saved 🍺")
}

const drinkBeer = (beer) => {
  if (beer.quantity == 1) {
    if (confirm("This is our last beer - are you sure you still want to drink it?")) {
      console.log("drinking");
      lastBeer(beer)
    }
  } else {
    beer.quantity -= 1;
    renderBeerDetails(beer)
  }
}

const lastBeer = (beer) => {
  blastBeer(beer)
  detailDiv.innerHTML = ""
  const beerIndex = dataStore.beerz.indexOf(beer);
  dataStore.beerz.splice(beerIndex, 1);
  proxy1.beerz = dataStore.beerz
}
