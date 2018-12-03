document.addEventListener('DOMContentLoaded', () => {

  const beerList = document.querySelector('#list-group')
  const beerDetail = document.querySelector('#beer-detail')

  let allBeers = []

  beerList.addEventListener('click', displayBeerInfo)
  beerDetail.addEventListener('click', editBeerDetails)

  function fetchBeers() {

    fetch('http://localhost:3000/beers', { method: 'GET' })
      .then(resp => resp.json())
      .then(beerData => {
        // console.log(beerData);
        beerData.forEach((beer) => {
            allBeers.push(beer)
            beerList.innerHTML += `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
        })
      }) //.then

  } //fetchBeers fn

  function displayBeerInfo(event) {
    // console.log("clicked beer");

    const id = parseInt(event.target.id)
    const beer = allBeers.find(beer => beer.id === id)

    beerDetail.innerHTML = renderBeerDetailHTML(beer)

  } //displaybeerInfo fn

  function renderBeerDetailHTML(beer) {
    return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="${beer.id}" class="btn btn-info">
      Save
    </button>
    `
  } //renderBeerDetailHTML fn

  function editBeerDetails(event) {

    const id = parseInt(event.target.id)
    let beer = allBeers.find(beer => beer.id === id)
    let beerIndex = allBeers.indexOf(beer)
    const newDesc = document.getElementsByTagName('TEXTAREA')[0].value

    if (event.target.className === "btn btn-info") {
      // console.log(`attempt to edit ${beer.name}`);

      fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify( {description: newDesc} )
      }) //fetch
      .then(resp => resp.json())
      .then(updatedBeer => {
        beerDetail.innerHTML = renderBeerDetailHTML(updatedBeer) //re-render beer details
        allBeers.splice(beerIndex, 1, updatedBeer); //update the beer array
        console.log(`${updatedBeer.name} description updated to: ${updatedBeer.description}`);
      })

    } //if

  } //editBeerDetails fn


  fetchBeers()

})
