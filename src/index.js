document.addEventListener('DOMContentLoaded', function() {
  const API = new JSONAPIAdapter("beers")
  const beerList = document.getElementById('list-group')
  const beerDetail = document.getElementById('beer-detail')

  function showBeers(){
    beerList.innerHTML = ""
    API.getAll().then(data => {
      data.forEach(function(beer){
        beerList.innerHTML += `
            <li class="list-group-item" id=${beer.id}>${beer.name}</li>
        `
      })
      beerList.addEventListener("click", function(e){
        showBeer(e.target.id)
      })
    })
  }

  function showBeer(id){
    beerDetail.innerHTML = ""
    API.getSingle(id).then (data => {
      console.log(data);
      beerDetail.innerHTML += `
        <h1>${data.name}</h1>
        <img src="${data.image_url}">
        <h3>${data.tagline}</h3>
        <h5>first brewed: ${data.first_brewed}</h5>
        <ul>Pairs Well With</ul>
          ${data.food_pairing.map(function(pair){
            return `<li>${pair}</li>`
          }).join(" ")}
        <textarea>${data.description}</textarea>
        <button id="edit-beer" data-id="${data.id} " class="btn btn-info">Save</button>
      `
      saveButton = document.getElementById('edit-beer')
      saveButton.addEventListener("click", function(e){
        let id = e.target.dataset.id
        let description = e.target.parentElement.getElementsByTagName('textarea')[0].value
        API.updateBeer({description: description}, id).then(function (response){
          if(response.ok){
            showBeer(id)
          };
        })
      })
    })
  }
  showBeers()
});
