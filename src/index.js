
document.addEventListener("DOMContentLoaded", () => {

  const domController = new Controller
  const adapterJSON = new Adapter('http://localhost:3000/beers')
  const adapterAPI = new Adapter('https://github.com/typicode/json-server')


  adapterJSON.getAll()
  .then(rsp => rsp.json())
  .then(json => {
    json.forEach( drink => new Beer(drink) )
    domController.appendToPage( Beer.renderAll() )
    domController.appendDetail(Beer.renderDetailAll())
  })

  // const saveBtns = Array.from(document.querySelectorAll('edit-beer'))
  // console.log(saveBtns)














  // const detail = document.getElementById('beer-detail')


})


// * **Route:** GET `http://localhost:3000/beers`
//
// #### Styling
//
// [Bootstrap](https://getbootstrap.com/docs/3.3/components/#list-group) is loaded into this project via a link tag in the head of the html. Generally, do not worry about styling in this application.
//
// **One important point** is that for the beer names to show up correctly, the html should have the following class names:
//
// ```html
// <ul class="list-group">
//   <li class="list-group-item">Beer title 1</li>
//   <li class="list-group-item">Beer title 2</li>
//   /* etc... */
// </ul>
// ```
//
// ### Step 2 - Display Single Beer Details
//
// When I click a beer name, the application should reveal more information about that particular beer.
// See the example above for the additional information that should be displayed.
//
// * **Route:** GET `http://localhost:3000/beers/:id`
//
// The beer details should be added to this div
//
// ```html
// <div id="beer-detail">
//
// </div>
// ```
// The html should look something like:
//
// ```html
// <h1>Beer Name</h1>
// <img src="<add beer img url here>">
// <h3>Beer Tagline</h3>
// <textarea>Beer Description</textarea>
// <button id="edit-beer" class="btn btn-info">
//   Save
// </button>
// ```
//
// ### Step 3 - Edit Beer Details
//
// When looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database.
//
// To update a beer you'll need to make a PATCH request
// * **Route:** PATCH `http://localhost:3000/beers/:id`
// * **Body:**
// ```js
//   {description: "your new description"}
// ```
// * **Headers:**
// ```js
//   {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
//   ```
//
//   **Important Notes:**
//   * For all intents and purposes, PATCH behaves the same as POST. If you know how to POST, you know how to PATCH
//   * When using `fetch` to make a PATCH request, be sure to capitalize method: 'PATCH'
