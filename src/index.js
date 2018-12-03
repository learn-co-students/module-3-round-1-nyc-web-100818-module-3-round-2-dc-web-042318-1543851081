document.addEventListener('DOMContentLoaded', () => {
  const beerContainer = document.querySelector('#list-group')
  const beerCard = document.querySelector('#beer-detail')
  let allBeers = []

  //------------Show All Beer--------//
    fetch("http://localhost:3000/beers")
      .then(r => r.json())
      .then(beerArray => {
        //console.table(beerArray)
        allBeers = beerArray
        beerArray.forEach((beer) => {
          beerContainer.innerHTML += `
          <li style="text-align:center" class="list-group-item" id="beer-${beer.id}">${beer.name}</li>`
        })//end of for each
      })//end of then

  //-----------Display Single Beer Card----------//
  beerContainer.addEventListener('click', e => {
    if(e.target.className === "list-group-item") {
      let clickedBeerId = e.target.id.split('-')[1]
      let foundBeer = allBeers.find((beer) => beer.id == clickedBeerId )
      //console.log(foundBeer);
      beerCard.innerHTML = `
      <h1>${foundBeer.name}</h1>
      <hr>
      <img src=${foundBeer.image_url}>
      <h3>${foundBeer.tagline}</h3>
      <textarea id="beer-description">${foundBeer.description}</textarea>
      <br><br>
      <button id="edit-beer-${foundBeer.id}" class="btn btn-info">
        Save
      </button>
      <br><br>
      <ul> Food Pairings:
      <li>${foundBeer.food_pairing[0]}</li>
      <li>${foundBeer.food_pairing[1]}</li>
      <li>${foundBeer.food_pairing[2]}</li>
      </ul>
      <p>Brewers Tips: ${foundBeer.brewers_tips}</p>
      `
    }//end of if click on list-group-item
  })//end of click EventListener

  //----------edit Patch-------------//
  beerCard.addEventListener('click', e => {
    if(e.target.className === "btn btn-info") {
      let editBeerId = e.target.id.split('-')[2]
      let descriptionInput = e.target.parentElement.querySelector('#beer-description').value
      fetch(`http://localhost:3000/beers/${editBeerId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },//end of headers
        body: JSON.stringify({
          description: descriptionInput
        })//end of body
      })//end of fetch
      .then(r => r.json())
      .then(updatedBeer => {
        let newBeer = allBeers.find(beer => beer.id == updatedBeer.id)
        let index = parseInt(updatedBeer.id)-2
        allBeers[index].description = descriptionInput
        console.table(allBeers)
        let card = document.querySelector('#beer-detail')
        card.querySelector('#beer-description').innerHTML = descriptionInput
      })//end of then
    }//end of if click on save
    // e.preventDefault()
  })//end of save event listener


})//end of DOM
