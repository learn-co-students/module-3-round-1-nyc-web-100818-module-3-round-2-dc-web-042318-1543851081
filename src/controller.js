class Controller {

  constructor() {
     this.container = document.getElementById('list-group')
     this.container.addEventListener('click', event.handle)
  }

  appendToPage(groupHTML){
    this.container.innerHTML = groupHTML

    this.container.addEventListener('click', event => {
      const matchObj = Beer.all.filter(drink => event.target.id === drink.id)
      Adapter.getOne(event.target.id)
      .then(rsp => rsp.json())
      .then(json => {
        render
        //

      })

    })


  }

  appendDetail(detailHTML) {
    this.detailContainer = document.getElementById('beer-detail')
    this.detailContainer.innerHTML = detailHTML
    this.detailContainer.addEventListener('click', event => {
      const matchObj = Beer.all.filter(drink => event.target.id === drink.id)
      // if (event.target)
      // matchObj.renderDetail()
      // matchObj.update()
      console.log(event.target)


    })
  }


  // constructor(){
  //   this.containerGroup = document.getElementById('list-group')
  //   this.containerDetail = document.getElementById('beer-details')
  //
  //   this.containerGroup.addEventListener('click', event.handle)
  //   // this.containerDetail.addEventListener('click', event.handle)
  // }
  //
  // appendToPage(groupHTML, detailHTML) {
  //   this.containerGroup.innerHTML = groupHTML
  //   this.containerDetail.innerHTML = detailHTML
  // }





}
