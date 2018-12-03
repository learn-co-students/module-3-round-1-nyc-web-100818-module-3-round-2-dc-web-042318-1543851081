document.addEventListener('DOMContentLoaded', init)

function init() {
  let apiCommunicator = new ApiCommunicator;
  let domController = new DomController;
  apiCommunicator.getBeers()
  .then(p => {
    p.forEach(beer => new Beer(beer))
    domController.appendBeers(Beer.renderAll())
  })
}
