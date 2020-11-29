import $store from "./store/index.js";

import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";

function App() {
  const renderTodo = () => {
    const filteredTodo = $store.todo.filterItems();
    todoList.renderTodoList(filteredTodo);
    todoCount.renderTodoCount(filteredTodo);
  };

  new TodoInput(renderTodo);
  const todoList = new TodoList(renderTodo);
  const todoCount = new TodoCount(renderTodo);
  new TodoFilter(renderTodo);

  renderTodo();
}

new App();
