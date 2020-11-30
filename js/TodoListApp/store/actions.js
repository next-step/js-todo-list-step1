export default {
  // action 함수 작성
  addItem(context, payload) {
    context.commit('addItem', payload)
  },
  deleteItem(context, payload) {
    context.commit('deleteItem', payload)
  }
}