import { $ } from "../utils/selectors.js";

const CIPHER = 1000;

export default class TodoInput {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.mount();
  }
  mount() {
    this.$app.addEventListener("keypress", this.handleInputValue.bind(this));
  }
  render() {}
  handleInputValue(e) {
    if (e.key === "Enter") {
      const prevState = this.store.getState();
      const newTodo = {
        id: Math.floor(Math.random() * CIPHER),
        content: e.target.value,
        status: "false",
      };
      const newState = { ...prevState, todos: [...prevState.todos, newTodo] };
      this.store.setState(newState);
      e.target.value = "";
    }
  }
}
