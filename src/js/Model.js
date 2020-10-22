export default class Model {
  static state = {
    todos: [],
  }

  static get todosCount() {
    return Model.state.todos.length
  }

  static setState = (payload) => {
    const newState = { ...Model.state, ...payload }
    Model.state = newState
  }
}
