// TODO DELIVERABLES/USER STORIES
// TODO 1. As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen. -✅
// TODO 2. As a user, when I click a beer name, the application should reveal more information about that particular beer.
// 1. add event listener to the parent container and using event delegation listen for clicks on beer names

// TODO 3 As a user, when looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database

// ************************BEERZ APP*********************************

// !!GLOBAL VARIABLES!!

let allBeers = []; // allBeers array
const beersUrl = "http://localhost:3000/beers";

// !!DOM ELEMENTS
const beersContainer = document.querySelector("#list-group");
const beerDetailDiv = document.querySelector("#beer-detail");

// !! EVENT LISTENERS

document.addEventListener("DOMContentLoaded", () => {
  fetchAllBeers();
  displayBeerInfo();
});

function displayBeerInfo() {
  beersContainer.addEventListener("click", function(event) {
    if (event.target.className === "list-group-item") {
      const clickedBeer = allBeers.find(function(beer) {
        return beer.id == event.target.dataset.id;
      });
    }
  });
}

// beersContainer.addEventListener("click", displayBeerInfo);

// !! FUNCTIONS

// function init() {
//   // Greet user
//   console.log("Welcome to Beerz young grasshopper");
//   fetchAllBeers();
//   // displayBeerInfo();
// }

function fetchAllBeers() {}
fetch(beersUrl)
  .then(r => {
    console.log("Fetching all beers");
    return r.json();
  })
  .then(d => {
    console.table(d);
    allBeers = d;
    beersContainer.innerHTML = renderAllBeers(d);
  });

// !!HELPER METHODS!!

// renderAllBeers (names) function
function renderAllBeers(beerArray) {
  return beerArray
    .map(function(beer) {
      return `
      <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
      `;
    })
    .join("");
  // <li class="list-group-item">Beer title 1</li>
}

// function renderBeerInfo(beer) {
//   return;
//   `
//   <h1>${beer.name}</h1>
//   <img src="${beer.image_url}">
//   <h3>${beer.tagline}</h3>
//   <textarea>${beer.description}"</textarea>
//   <button id="edit-beer" class="btn btn-info">
//   Save
//   </button>
//   `;
// }

// function displayBeerInfo() {
//   beersContainer.addEventListener("click", function(event) {
//     if (event.target.className === "list-group-item") {
//       const clickedBeer = allBeers.find(function(beer) {
//         return beer.id == event.target.dataset.id;
//       });
//     }
//   });
// }
