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

  const list = document.getElementById("todo-list");

  TodoInput(insertTodoItem);

  const onClick = e => {
    const {
      dataset: { index }
    } = e.target.parentElement;

    const id = parseInt(index, 10);

    if (e.target.className === "destroy") {
      removeTodoItem(parseInt(index, 10));
      return;
    }
    if (e.target.className === "toggle") {
      toggleTodoItem(id);
    }
  };

  const setCount = state => {
    const { todo } = state;

    const todoCount = document.querySelector(".todo-count");
    const count = todoCount.querySelector("strong");

    count.innerHTML = todo.length;
  };

  list.addEventListener("click", onClick);

  store.subscribe(() => {
    setCount(store.getState());
    TodoList(store.getState());
  });
};
