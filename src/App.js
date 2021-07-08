import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoFilters from "./components/TodoFilters.js";

import { $ } from "./utils/selectors.js";

export default function App(store) {
  store.addObserver(new TodoInput(store, $(".new-todo")));
  store.addObserver(new TodoList(store, $(".todo-list")));
  store.addObserver(new TodoTotal(store, $(".todo-count")));
  store.addObserver(new TodoFilters(store, $(".filters")));
}
