document.addEventListener("DOMContentLoaded", () => {
  let allBeer = [];
  const beerDetail = document.getElementById
  ("beer-detail");

  const beerForm = document.getElementById("edit-beer-form");
  const url = 'http://localhost:3000/beers';

  beerForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log(event);
    
    let editBeer = {
      "description": event.target.description.value
    }

    patchBeers(event.target.dataset.id, editBeer);
  })

  beerDetail.addEventListener("click", event => {
    event.preventDefault();
    
    if(event.target.id == "beer-name") {
      // console.log(event.target.dataset.id);
      let allBeerContainers = Array.from(document.getElementsByClassName("beer-container"));

      let beerContainer = allBeerContainers.find(container => container.dataset.id == event.target.dataset.id)
      //super messy i know; also should not be able to click twice and add same html(normally i would add more info html when rendering element and set it to display:none and then when name is clicked change it to block, and have a toggle function that would change this each time i click)so need to add some conditional(
      beerContainer.innerHTML += showMoreInfo(findBeer(event.target.dataset.id));

      //toggle function that odesnt work womp 
      //toggleMoreInfo(event.target.dataset.id)
    }

    else if(event.target.id == "edit") {
      console.log(event.target.dataset.id);
      let beer = findBeer(event.target.dataset.id);
      beerForm.description.value = beer.description;
      beerForm.dataset.id = event.target.dataset.id;
    }
    else if(event.target.id == "edit-beer-button") {
      console.log('please')
    }
  });

  function findBeer(id) {
    return allBeer.find(beer => beer.id == id)
  }

  function getBeers() {
    return fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        else {
          throw response;
        }
      })
      .then(beers => {
        beers.forEach( beer => {
          allBeer.push(beer)
        })
        
        beerDetail.innerHTML = renderView();
      })
  }

  function patchBeers(id, beerObj) {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beerObj)
    })
      .then(response => {
        if(response.ok) {
          return response.json()
        }
        else {
          throw response
        }
      })
      .then(beer => {
        let editedBeer = allBeer.find(beer => beer.id == id)
        let index = allBeer.indexOf(editedBeer);
        allBeer.splice(index, 1, beer)
        beerDetail.innerHTML = renderView(allBeer);
      })
  }

  function renderView() {
    return allBeer.map(beer => renderBeer(beer)).join("");
  }

  function renderBeer(beer) {
    return `
      <div class="beer-container" style="margin: 20px;" data-id=${beer.id}>
        <div id="beer-name" data-id="${beer.id}">${beer.name}</div>
        <p>${beer.tagline}</p>
        <img src="${beer.image_url}"/>
        <button id="edit" data-id="${beer.id}">edit</button>
      </div>
    `
  }

  function showMoreInfo(beer) {
    return `
      <div class="more-info">
        <p>${beer.first_brewed}</p>
        <p>${beer.description}</p>
        <p>${beer.brewers_tips}</p>
      </div>
    `
  }

  //function that doesnt work
  // function toggleMoreInfo(id) {
  //   let moreInfoContainer = beerDetail.querySelector(".more-info");
  //   //when triggered on click removes this html("hides it")
  //   if(moreInfoContainer != null) {
  //     beerDetail.removeChild(moreInfoContainer) 
  //   }
  //   else {
  //     //else on click add html to container
  //     beerDetail.innerHTML += showMoreInfo(findBeer(id))
  //   }
  // }

  getBeers();
});