class ApiCommunicator {
  constructor() {
    this.beersUrl = 'http://localhost:3000/beers/'
  }

  getBeers() {
    return fetch(this.beersUrl)
    .then(r=>r.json())
  }

  getSingleBeer(id) {
    return fetch(this.beersUrl + `${id}`)
    .then(r=>r.json())
  }

  updateBeers(id, beer) {
    return fetch(this.beersUrl + `${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application.json'
      },
      body: JSON.stringify(beer)
    })
    .then(r=>r.json())
  }


}
