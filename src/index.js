document.addEventListener("DOMContentLoaded", () => {
let allBeers = []

  const singleBeerDetail = document.getElementById("beer-detail")
  const beerLeftColumn = document.getElementById("list-group")
  // console.log(singleBeerDetail)

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(d => {
  allBeers = d
  renderSingleBeer(allBeers)
})

///------------------- RENDER SINGLE LEFT SIDE BEER ------------------------//////////
function renderSingleBeer(allBeers) {
  allBeers.forEach((beer) => {
    beerLeftColumn.innerHTML += `
      <li data-id="${beer.id}" class="list-group-item">${beer.name}</li>
    `
  }) // end of FOR EACH
} //end of renderSingleBeer


///------------------- CLICK BEER ------------------------//////////
beerLeftColumn.addEventListener("click", (e)=> {
  clickedBeerId = e.target.dataset.id

  fetch(`http://localhost:3000/beers/${clickedBeerId}`, { method: "GET"})
  .then(r=> r.json())
  .then(beer => {
    renderBeerDetail(beer)
  }) // end of then


}) // end of addEventListener

///------------------- BEER DETAIL ------------------------//////////
///// how do i render only to the right of the page????  /////
function renderBeerDetail(beer) {
  singleBeerDetail.innerHTML = ` <h1 id="beer-name" data-id="${beer.id}"> ${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="myTextArea">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
  `
  // console.log(beer);
} //end of renderBeerDetail


///------------------- EDIT BEER ------------------------//////////
singleBeerDetail.addEventListener("click", (e)=> {
  let description = document.getElementById("myTextArea").value

  let currentBeerId = document.getElementById("beer-name").dataset.id
  // console.log(currentBeerId);
  // currentBeerId = parseInt(currentBeerId.dataset.id)

  let saveButton = document.getElementById("edit-beer")
  let editDescription = description
  // debugger

  fetch(`http://localhost:3000/beers/${currentBeerId}`,
    {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify ({
        "description": editDescription
      })
    })
    .then(r => r.json())
    .then(data => {
      editDescription.innerHTML = `<h1 id="beer-name" data-id="${data.id}"> ${data.name}</h1>
      <img src="${data.image_url}">
      <h3>${data.tagline}</h3>
      <textarea id="myTextArea">${data.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>
      `
    }) // end of .then
}) // end of event

}) //  end of DOMContentLoaded
