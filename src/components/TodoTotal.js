export default class TodoTotal {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
  }
  render() {
    const state = this.store.getState();
    this.$app.innerHTML = `총 <strong>${state.todos.length}</strong> 개</span>`;
  }
}
