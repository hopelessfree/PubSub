import { Actions } from "./store";

export default <Actions>{
  addBook(contxet, payload) {
    contxet.commit('addBook', payload)
  }
}