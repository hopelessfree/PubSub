import store from "../../store/index"

Page({
  data: {
    books: []
  },

  onLoad() {
    store.events.subscribe(
      'stateChange',
      (params) => {
        console.log(params)
        this.setData({ books: params.books })
      }
    )
  },

})
