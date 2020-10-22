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

  const onClick = ({ target }) => {
    const {
      dataset: { index }
    } = target.parentElement;

    const id = parseInt(index, 10);

    switch (target.className) {
      case "destroy": {
        removeTodoItem(parseInt(index, 10));
        break;
      }
      case "toggle": {
        toggleTodoItem(id);
        break;
      }
      default:
        return;
    }
  };

  const setCount = state => {
    const { todos } = state;

    const todoCount = document.querySelector(".todo-count");
    const count = todoCount.querySelector("strong");

    count.innerHTML = todos.length;
  };

  TodoInput(insertTodoItem);
  list.addEventListener("click", onClick);

  store.subscribe(() => {
    setCount(store.getState());
    TodoList(store.getState());
  });
};
