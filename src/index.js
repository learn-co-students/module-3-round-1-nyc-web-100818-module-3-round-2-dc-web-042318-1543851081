beerList.addEventListener('click', event => {
  const beerId = event.target.dataset.id;
  const beer = dataStore.beerz.find(beer => beer.id == beerId);
  renderBeerDetails(beer);
})

detailDiv.addEventListener('click', event => {
  if (event.target.id == "edit-beer") {
    const beerId = event.target.dataset.id;
    const beer = dataStore.beerz.find(beer => beer.id == beerId);
    const beerDescription = event.target.parentElement.querySelector('textarea').value
    editBeer(beer, beerDescription);
  }
})
