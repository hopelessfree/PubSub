import store from "../../store/index"

Page({
  data: {
    books: [],
    value: "123",
  },

  onInput(event: { detail: { value: any } }) {
    this.setData({ value: event.detail.value })
  },

  onAdd() {
    store.dispatch('addBook', { name: this.data.value })
    console.log('111')
  },

  onBack() {
    wx.navigateBack()
  },

})
