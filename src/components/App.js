import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";

function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {
    new TodoInput();
    new TodoCount();
    new TodoList();
    new TodoFilter();
  };

  this.init();
}

export default new App();
