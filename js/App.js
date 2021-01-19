import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";

import $store from "./store/index.js";

function App() {
  const renderTodo = () => {
    todoList.renderTodoList();
    todoCount.renderTodoCount();
  };

  new TodoInput();
  const todoList = new TodoList();
  const todoCount = new TodoCount();
  new TodoFilter();

  $store.todo.defineSetter(renderTodo);
  $store.filter.defineSetter(renderTodo);

  renderTodo();
}

new App();
