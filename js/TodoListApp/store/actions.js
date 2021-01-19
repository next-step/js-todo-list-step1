export default {
  // action 함수 작성
  addItem(context, payload) {
    console.log('actions addItem', );
    context.commit('addItem', payload)
  },
  deleteItem(context, payload) {
    console.log('actions deleteItem', );
    context.commit('deleteItem', payload)
  },
  toggleItem(context, payload) {
    console.log('actions toogleItem', );
    context.commit('toggleItem', payload)
  },
  resetItem(context, payload) {
    console.log('actions resetItem', );
    context.commit('resetItem', payload)
  },
  updateItem(context, payload) {
    console.log('actions updateItem', );
    context.commit('updateItem', payload)
  },
  setFilteredType(context, payload) {
    console.log('actions setFilteredType', );
    context.commit('setFilteredType', payload)
  }
}