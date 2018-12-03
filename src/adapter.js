
class JSONAPIAdapter {
  constructor(endpoint) {
    this.endpoint = `http://localhost:3000/${endpoint}`
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
   getAll() {
    return fetch(this.endpoint)
      .then(response=>response.json())
  }

   getSingle(id) {
    return fetch(`${this.endpoint}/${id}`)
      .then(response=>response.json())
  }


   updateBeer(body, id){
    return fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }
 }
