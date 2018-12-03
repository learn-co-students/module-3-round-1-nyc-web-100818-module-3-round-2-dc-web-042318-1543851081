class PunkAPIAdapter {
  constructor() {
    this.baseURI = 'https://api.punkapi.com/v2/beers'
  }

  getRandom() {
    return this._request(`${this.baseURI}/random`, {
      method: 'GET'
    })
  }

  _request(endpoint, options) {
    return fetch(endpoint, options)
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          throw r
        }
      })
  }
}