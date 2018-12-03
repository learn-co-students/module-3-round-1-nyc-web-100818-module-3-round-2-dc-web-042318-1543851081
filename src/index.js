document.addEventListener('DOMContentLoaded', () => {
  const controller = new DOMController
  Beer.populateFromAPI()
    .then(() => {
      controller.render()
    })
})