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
  },
  toggleItem(state, payload) {
    /**
     * {Mix} id, complete
     * {Number} id
     * {Boolean} complete
     */
    const index = state.list.findIndex(v => v.id === payload.id)
    if (index === -1) return state
    
    let newList = [...state.list]
    newList[index].complete = payload.complete
    return state
  },
  resetItem(state) {
    /** */
    let newList = [...state.list]
    state.list = newList
    return state
  },
  updateItem(state, payload) {
    /** */
    let index = state.list.findIndex((item) => item.id === parseInt(payload.id, 10))

    if (index === -1) {
      return state
    }

    if (index !== -1) {
      state.list[index].context = payload.context
      return state
    }
  },
  setFilteredType(state, payload) {
    let newState = Object.assign({}, state)
    newState.filteredType = payload
    return newState
  }
}