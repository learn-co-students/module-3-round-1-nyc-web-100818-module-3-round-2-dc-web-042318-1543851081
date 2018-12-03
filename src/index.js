document.addEventListener('DOMContentLoaded', () => {
    const allBeersContainer = document.querySelector('.col-md-4')
    const beerDisplay = document.getElementById('beer-detail')

    //load all beers in beerDisplay
    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(json => {
            json.forEach(beer => {
                allBeersContainer.innerHTML += `
                    <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
                `
            })
        })

    //listen for a click on beerDisplay and load relevant beer info
    allBeersContainer.addEventListener('click', () => {
        const beerID = parseInt(event.target.dataset.id)

        fetch(`http://localhost:3000/beers/${beerID}`)
            .then(resp => resp.json())
            .then(beer => {
                beerDisplay.innerHTML = `
                    <h1>${beer.name}</h1>
                    <img src=${beer.image_url}>
                    <h3>${beer.tagline}</h3>
                    <textarea id='beer-description'>${beer.description}</textarea>
                    <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
                    Save
                    </button>
                `
            })
    })

    // on click within beerDisplay, if the target is the 'edit-beer' id on the save button,
    // patch the new description to the DB
    beerDisplay.addEventListener('click', () => {
        if (event.target.id === 'edit-beer') {
            const desc = document.getElementById('beer-description').value
            const beerID = parseInt(event.target.dataset.id)
        
            return fetch(`http://localhost:3000/beers/${beerID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ description: `${desc}` })
            })
                .then(resp => resp.json())
                .then(json => console.log(json))
        }
    })

}) // end of DOM Content Loaded