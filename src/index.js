document.addEventListener('DOMContentLoaded', () => {
 console.log('DOM Loaded!');

 const beerRow = document.querySelector('#list-group')
 const beerDetailDiv = document.querySelector(".col-md-8")
 const beerDetail = document.querySelector("#beer-detail");
 const editBeerSaveButton = document.querySelector(".edit-beer");

 let allBeers = [];

 showBeers = () => {
   fetch(`http://localhost:3000/beers`, { method: 'GET' })
     .then(response => response.json())
     .then(json => {
       allBeers = json;
       json.forEach(function(beer) {
         beerRow.innerHTML +=`<li class="list-group-item" id=${beer.id} >${beer.name}</li>`
       }) // json.forEach(function(beer) ---> ENDS HERE
     }) // then(json => ---> ENDS HERE
 } // showBeers = () ---> ENDS HERE
 showBeers()

 beerRow.addEventListener("click", event => {
   clickedBeer = parseInt(event.target.id);
   targetBeer = allBeers.find(beer => beer.id === clickedBeer);
   console.table(targetBeer);
   beerDetail.innerHTML = `
   <h1>${targetBeer.name}</h1>
   <img src=${targetBeer.image_url}>>
   <h3>${targetBeer.tagline}</h3>
   <textarea id="text-area" >${targetBeer.description}</textarea>
   <button id=${targetBeer.id} class="btn btn-info">
     Save
   </button>`
 });

 beerDetail.addEventListener("click", event => {
   console.log(event.target.id);
   console.log(event.target.className);
   if (event.target.className === "btn btn-info") {
     console.log("true");
     editedBeerId = parseInt(event.target.id);
     const textAreaValue = document.querySelector('#text-area').value
     editBeerDescription = () => {
       fetch(`http://localhost:3000/beers/${editedBeerId}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
           'Accept': "application/json"
         },
         body: JSON.stringify({
           description: textAreaValue
         })
       })
       .then(r => r.json())
       .then(data => {
         console.log(data);
       });
     }
     editBeerDescription()
   }
 })
}) // document.addEventListener('DOMContentLoaded' ---> ENDS HERE
