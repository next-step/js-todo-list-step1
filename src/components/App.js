import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import { ALL, ACTIVE, COMPLETED, STORAGE_KEY } from "../../utils/constants.js";
import { storage } from "../../utils/storage.js";

function getTodosByStatus(todos, status) {
  switch (status) {
    case ALL:
      return todos;
    case ACTIVE:
      return todos.filter((todo) => todo.isCompleted === false);
    case COMPLETED:
      return todos.filter((todo) => todo.isCompleted === true);
    default:
      throw new Error("Unhandled Case");
  }
}
function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {
    const { onEdit, onFilter } = this;
    this.filterStatus = ALL;

    new TodoInput();
    new TodoCount();

    this.$todoList = new TodoList();

    new TodoFilter({
      selector: ".filters",
      onFilter,
    });
  };

  this.setState = (todos) => {
    storage.set(STORAGE_KEY, todos);
    const renderTodos = getTodosByStatus(todos, this.filterStatus);
    this.$todoList.setState(renderTodos);
  };

  this.onFilter = (status) => {
    this.filterStatus = status;
    this.setState(this.todos);
  };

  this.init();
}

export default new App();
