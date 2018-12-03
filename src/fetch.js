fetch(`http://localhost:3000/beers`)
.then(response => response.json())
.then(array => {
  array.forEach(beer => new Beer(beer))
  proxy1.beerz = dataStore.beerz
})

const editApi = (beer, beerDescription) => {
  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      description: beerDescription
    })
  })
}
