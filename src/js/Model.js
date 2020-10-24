export default class Model {
  static state = {
    todos: [],
  }

  static setState = (payload) => {
    const newState = { ...Model.state, ...payload }
    Model.state = newState
  }
}
