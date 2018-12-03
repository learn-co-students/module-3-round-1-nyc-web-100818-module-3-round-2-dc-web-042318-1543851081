class JSONAPIAdapter {
  constructor(baseURI) {
    this.baseURI = baseURI
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAll() {
    return this._request(this.baseURI, {
      method: 'GET'
    })
  }

  patch(id, data) {
    return this._request(`${this.baseURI}/${id}`,{
      method: 'PATCH',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  post(data) {
    return this._request(this.baseURI,{
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
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