document.addEventListener('DOMContentLoaded', () => {
  console.log('you are now loaded');


const beerList = document.getElementById('list-group')
const beerDetails = document.getElementById('beer-detail')

beerDetails.style.backgroundColor = 'teal'

let allBeers;

fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(data => {
    allBeers = data
    console.log(allBeers);
    beerList.innerHTML = showBeers(data)
  })

  function showBeers(data) {
    return data.map((data) => {
      return `<li id=${data.id} class="list-group-item">${data.name}</li>`
    }).join("")
  }

  function showBeerDetails (selectedBeer) {
    beerDetails.innerHTML =
    `<center><div id= ${selectedBeer.id}>
    <h1>${selectedBeer.name}</h1>
    <img src=${selectedBeer.image_url}>
    <h3>${selectedBeer.tagline}</h3>
    <textarea>${selectedBeer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    </div></center>`
  }


  beerList.addEventListener('click', (event) => {
    let beerListTag = event.target
    let beerId = parseInt(beerListTag.id)
    console.log(beerListTag, beerId);
    console.log('yerrr');
    let selectedBeer = allBeers.filter(beer => beer.id === beerId)[0]
    console.log(selectedBeer);
    showBeerDetails(selectedBeer)
  })


  beerDetails.addEventListener('click', (event) => {
    event.preventDefault()
    let saveButton = document.getElementById('edit-beer')
    if(event.target === saveButton){
      let beerId = parseInt(event.target.parentElement.id)
        console.log('YOU SUBMITT');
        let beerDiv = event.target.parentElement
        let beerText = event.target.parentElement.getElementsByTagName('textarea')[0]
      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers:
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(
          {
            "description": event.target.parentElement.querySelector('textarea').value
          }
        )
      })//end of fetch
      beerText.innerText = event.target.parentElement.querySelector('textarea').value
    }//end of if
  })//end of addEventListener






})//end of DOMContentLoaded
