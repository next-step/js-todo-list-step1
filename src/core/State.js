export default class State {
  constructor(state) {
    this.state = state;
  }

  get() {
    return this.state;
  }

  set(newState) {
    this.state = newState;
  }
}
