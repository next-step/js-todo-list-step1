export default class TodoModel {
  static state = {
    todos: [],
  }

  static setState = (payload) => {
    const newState = { ...TodoModel.state, ...payload }
    TodoModel.state = newState
  }
}
