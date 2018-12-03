document.addEventListener('DOMContentLoaded', function(){
const beerDetail = document.querySelector('#beer-detail')
/////////////////////////////////////fetch///////////////////////////////////////////////////
 let allBeers = []

 function fetchBeers() {

     fetch("http://localhost:3000/beers", { method: 'GET' })
       .then(r => r.json())
       .then(r => {
         allBeers = r
         return renderBeers(allBeers)
       })
 }
     fetchBeers()


// // ///////////////////////////////////////////////////render Beers///////////////////////////////////////////////////////
     function renderBeers(allBeers){
       let jsonAsHTML = allBeers.map((b) => {
         return  `
          <ul id="beer-${b.id}" class="list-group">

           <h2>Name: "${b.name}"</h2>
           <img src="${b.image_url}" class="beer-pic"/>
           <h3>Tag Line: "${b.tagline}"</h3>
           <h3>First Brewed: "${b.first_brewed}"</h3>
           <h3>Description: "${b.description}"</h3>
           <h3>Food Pairing: "${b.food_pairing}"</h3>
           <h3>Brewers Tips: "${b.brewers_tips}"</h3>
           <button data-action="edit" id="${b.id}">Edit</button>
          </ul>
       `}).join('')

       beerDetail.innerHTML = jsonAsHTML
     }
// ////////////////////////////////////////////edit button prefill fields/////////////////////////////////////////////
    const editBeerForm = document.querySelector('#edit-beer-form')
    const editBeerNameInput = document.querySelector('#edit-beer-name-input')
    const editBeerTaglineInput = document.querySelector('#edit-beer-tagline-input')
    const editBeerImageInput = document.querySelector('#edit-beer-image-input')
    const editBeerFirstBrewedInput = document.querySelector('#edit-beer-first_brewed-input')
    const editBeerDescriptionInput = document.querySelector('#edit-beer-description-input')
    const editBeerFoodPairingInput = document.querySelector('#edit-beer-food_pairing-input')
    const editBeerBrewersTipsInput = document.querySelector('#edit-beer-brewers_tips-input')

    beerDetail.addEventListener('click', e => {

             if (e.target.dataset.action == 'edit') {
               let clickedBeerId = e.target.id
               editBeerForm.dataset.id = clickedBeerId

                fetch(`http://localhost:3000/beers/${clickedBeerId}`)
                  .then(r => r.json())
                  .then(clickedBeerObj => {

                    editBeerNameInput.value = clickedBeerObj.name
                    editBeerTaglineInput.value = clickedBeerObj.tagline
                    editBeerImageInput.value = clickedBeerObj.image_url
                    editBeerFirstBrewedInput.value = clickedBeerObj.first_brewed
                    editBeerDescriptionInput.value = clickedBeerObj.description
                    editBeerFoodPairingInput.value = clickedBeerObj.food_pairing
                    editBeerBrewersTipsInput.value = clickedBeerObj.brewers_tips

                  })


              }
       }) // end of click event

// /////////////////////////////////////////////edit persist to DB////////////////////////////////////////////////////////////
  editBeerForm.addEventListener('submit', (e) => {
    debugger
        e.preventDefault()
        let formDatasetIdFromBeerIndex = e.target.dataset.id
        let editBeerNameInput = editBeerNameInput.value

        let editBeerTaglineInput = editBeerTaglineInput.value
        let editBeerImageInput = editBeerImageInput.value
        let editBeerFirstBrewedInput = editBeerFirstBrewedInput.value
        let editBeerFoodPairingInput = editBeerFoodPairingInput.value
        let editBeerBrewersTipsInput = editBeerBrewersTipsInput.value


        fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {

         method: "PATCH",
         headers: {
                   'Content-Type': 'application/json',
                   Accept: 'application/json'
         },
         body: JSON.stringify({
           "name": editBeerNameInput,
           "tagline": editBeerTaglineInput,
           "image_url": editBeerImageInput,
           "first_brewed": editBeerFirstBrewedInput,
           "food_pairing": editBeerFoodPairingInput,
           "brewers_tips": editBeerBrewersTipsInput,
         })
       })
       .then(r => r.json())
       .then(updatedBeer => {
         fetchBeers()
        })
      }) // end of submit event

})//end of Dom Content Loaded
