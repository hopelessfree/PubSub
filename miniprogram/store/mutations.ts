import { Mutations } from "./store";

export default <Mutations>{
  addBook(state, payload) {
    state.books.push(payload)
    return state
  }
}