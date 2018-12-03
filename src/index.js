document.addEventListener("DOMContentLoaded", function(){

let allBeer = [];
//ref to list of beers
let beerList = document.getElementById('list-group');
let beerDetail = document.getElementById('beer-detail');


//get all beers on document load
fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(beerDataJSON => {
    console.log(beerDataJSON);
    allBeer = beerDataJSON;

    beerList.innerHTML = '';
    allBeer.forEach(beer =>
      beerList.innerHTML += `
      <li class="list-group-item" id="${beer.id}">${beer.name}</li>
      `
    )
  })//end initial fetch

//show more information for a beer
beerList.addEventListener('click', function(e){
  //debugger
  let clickedBeerId = parseInt(e.target.id)

  //****diff way to do it but not for this challenge
  //find this beer instance in my allBeers array
  //let foundBeer = allBeer.find(beer => beer.id == clickedBeerId)
  //****

  //fetch to * **Route:** GET `http://localhost:3000/beers/:id`
  fetch(`http://localhost:3000/beers/${clickedBeerId}`)
    .then(response => response.json())
    .then(foundBeerJSON => {
      console.log(foundBeerJSON);

      beerDetail.innerHTML = `
      <h1>${foundBeerJSON.name}</h1>
      <img src="${foundBeerJSON.image_url}">
      <h3>${foundBeerJSON.tagline}</h3>
      <textarea id="${foundBeerJSON.id}">${foundBeerJSON.description}</textarea>
      <button id="edit-beer-${foundBeerJSON.id}" data-id="${foundBeerJSON.id}" class="btn btn-info">
      Save
      </button>
      `
    })//end found beer fetch
    //edit beer description
    beerDetail.addEventListener('click', function(e){
      let clickedBeerId = parseInt(e.target.id)
      if (e.target.nodeName == "TEXTAREA"){
        let editedDescription = e.target.value;
        let saveBtn = document.getElementById(`edit-beer-${clickedBeerId}`)
        //debugger
        saveBtn.addEventListener('click', function(e){
        //debugger
        let newDescription = e.target.previousElementSibling.value;
        //debugger
        let clickedBeerId = parseInt(e.target.dataset.id)
        // debugger
          fetch(`http://localhost:3000/beers/${clickedBeerId}`, {method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({

              description: newDescription
            })

          });//end PATCH request

          //find this beer in allBeer Arr to update the edit
          // console.log(allBeer);
          // let foundBeer = allBeer.find(beer => beer.id = clickedBeerId)
          // foundBeer.description = newDescription;
          // console.log(allBeer);

        })//end save button event listener
      }//end if statement finding click on textarea for description


    });//end edit beer event listener

})


});//end of DOMContentLoad
