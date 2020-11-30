export default {
  ID: 1,
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
    return (state.list.length) ? 
      state.list.filter(v => v === payload) : 
      []
  }
}