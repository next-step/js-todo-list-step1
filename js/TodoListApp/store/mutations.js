export default {
  ID: 2,
  // mutation 함수 작성
  addItem (state, payload) {
    /**
     * {String} context
     */
    let self = this;
    let target = {
      id: self.ID++,
      context: payload,
      complete: false
    }
    console.log('mutation: ', target);
    state.list.push(target)
    return state
  },
  deleteItem (state, payload) {
    /**
     * {String} context
     */
    const index  = state.list.findIndex(v => v.id === payload)

    if (index === -1) return state

    state.list.splice(index, 1)
    return state
  }
}