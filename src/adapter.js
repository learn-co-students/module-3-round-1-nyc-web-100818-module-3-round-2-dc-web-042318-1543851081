
class Adapter {

  constructor(endpoint) {
    this.endpoint = endpoint
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAll() {
    return fetch(this.endpoint, {method: 'GET'})
  }

  getOne(id) {
    return fetch(`${this.endpoint}/${id}`)
  }

  updateBeer(id, body) {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        description: body.description,
      })
    })
  }

  deleteBeer(id) {
    return fetch(`${this.endpoint}/${id}`, { method: 'DELETE' })
  }

}
