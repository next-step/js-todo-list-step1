import {
  insertTodo,
  removeTodo,
  toggleTodo,
  updateTodo
} from "../reducer/todo.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default store => {
  const insertTodoItem = text => store.dispatch(insertTodo(text));
  const removeTodoItem = id => store.dispatch(removeTodo(id));
  const toggleTodoItem = id => store.dispatch(toggleTodo(id));
  const updateTodoItem = (id, text) => store.dispatch(updateTodo(id, text));

  const prevTodos = [];

  TodoInput(insertTodoItem);

  const todoSubscribe = type => {
    const { todos } = store.getState();

    if (!todos) {
      return;
    }

    let newTodo;

    if (location.hash === "#active") {
      newTodo = todos.filter(todo => !todo.completed);
    } else if (location.hash === "#completed") {
      newTodo = todos.filter(todo => todo.completed);
    } else {
      newTodo = todos;
    }

    TodoList({
      todos: newTodo,
      removeTodoItem,
      toggleTodoItem,
      updateTodoItem
    });
  };

  const hashChange = e => {
    const filter = document.querySelector(".filters");
    const tabs = filter.querySelectorAll("a");

    const selected = location.hash.split("#")[1] || "all";

    const selectedTab = filter.getElementsByClassName(selected);

    tabs.forEach(tab => tab.classList.remove("selected"));

    selectedTab[0].classList.add("selected");

    todoSubscribe("HASH_CHANGE");
  };

  window.addEventListener("hashchange", hashChange);

  store.subscribe(todoSubscribe);
};
