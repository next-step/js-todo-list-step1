import { $ } from "./selectors.js";

export function buildViewState(op, store, e) {
  $(".selected").classList.remove("selected");
  e.target.className = `${op} selected`;

  const state = store.getState();
  const newState = { ...state, view: op };
  store.setState(newState);
}

export function filterTodos(todos, view) {
  return todos.filter((todo) => {
    if (todo.status === view) return todo;
  });
}
