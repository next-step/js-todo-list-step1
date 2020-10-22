export default class Model {
  static state = {}

  static setState = (payload) => {
    const newState = { ...Model.state, ...payload }
    Model.state = newState
  }
}
