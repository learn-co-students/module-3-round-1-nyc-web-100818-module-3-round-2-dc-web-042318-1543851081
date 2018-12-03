document.addEventListener('DOMContentLoaded', () => {
  // DOM
  let beerUl = document.getElementById('list-group')
  let listDiv = document.getElementById('list-of-beers')
  let beerDetailDiv = document.getElementById('beer-detail')
  let saveBtn = document.getElementById('edit-beer')
  let userInputField = document.getElementById('desc')
  // VARIABLES
  let beersURL = 'http://localhost:3000/beers'
  let dataStore = [] // REMEMBER 2 KEEP TRACK OF THIS
  // FETCHES AND EVENT LISTENERS
  // initial GET to the server to render the beer names on the lhs of page
  fetch(beersURL) // { method: 'GET' } is DEFAULT so u don't have to write it
    .then(r => r.json())
    .then(arrayOfBeerObjects => {
      dataStore = arrayOfBeerObjects
      arrayOfBeerObjects.forEach((beerObject) => {
        // add to the ul
        beerUl.innerHTML += ` <li id="${beerObject.id}" class="list-group-item">${beerObject.name}</li>`
      })
    })

    listDiv.addEventListener('click', (e) => {
      // identify that it's an li with the class list-group-item
      if (e.target.className === 'list-group-item') {
        let clickedBeerID = e.target.id // gave the li's the ID above
        // find the beer in the data store
        // don't need to hit back end again bc we are simply getting data we already have in dataStore
        let foundBeer = dataStore.find((beerObject) => {
          return beerObject.id == clickedBeerID
        })
        // now that we have the info to render to the page, we can append the info to the beerDetailDiv
        beerDetailDiv.innerHTML = `<div id="beer-${foundBeer.id}">
                                    <h1>${foundBeer.name}</h1>
                                    <img src="${foundBeer.image_url}">
                                    <h3>${foundBeer.tagline}</h3>
                                    <form class="edit-form" data-id="${foundBeer.id}" >
                                    <textarea id="desc">${foundBeer.description}</textarea>
                                    <button id="${foundBeer.id}" id="edit-beer" class="btn btn-info">
                                      Save
                                    </button>
                                    </form>
                                  </div>`
      }
    })

    beerDetailDiv.addEventListener('submit', (e) => {
      e.preventDefault() // MUST PREVENT DEFAULT FOR SUBMIT EVENTS
      if (e.target.className === 'edit-form') { // NOW we are hitting the FORM vs. the entire div
        // the edit form's data id is the clicked beer's id
        let beerToEditId = e.target.dataset.id
        // grab the user input to render the input to the page
        let beerToEdit = document.getElementById(`beer-${beerToEditId}`)
        let newDesc = beerToEdit.querySelector('#desc').value
        // update the data store
        let foundBeer = dataStore.find((beer) => {
          return beer.id == beerToEditId
        })
        foundBeer.description = newDesc
        console.log(dataStore);
        // now send a patch w the new description
        fetch(`http://localhost:3000/beers/${beerToEditId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            "description": newDesc
          })
        })
        .then(r => r.json())
        .then(updatedBeerObject => { // this came back w updated desc! :)
          // add this update to the beer's pop up page
          let beerToUpdate = document.getElementById(`beer-${updatedBeerObject.id}`)
          let descField = beerToUpdate.querySelector('#desc')
          descField.value = updatedBeerObject.description
          // beerDetailDiv.innerHTML = `<div id="beer-${updatedBeerObject.id}">
          //                             <h1>${updatedBeerObject.name}</h1>
          //                             <img src="${updatedBeerObject.image_url}">
          //                             <h3>${updatedBeerObject.tagline}</h3>
          //                             <form class="edit-form" data-id="${updatedBeerObject.id}" >
          //                             <textarea id="desc">${updatedBeerObject.description}</textarea>
          //                             <button id="${updatedBeerObject.id}" id="edit-beer" class="btn btn-info">
          //                               Save
          //                             </button>
          //                             </form>
          //                           </div>`

        })

      } // end
    }) // end






}) // DOMContentLoaded
