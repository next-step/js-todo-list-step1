import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import TodoStatus from "./components/TodoStatus.js";
import { getStorageData, setStorageData } from "./utils/handleStorage.js";
import { handleData } from "./utils/handleData.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  this.setState = (newData, { status = this.status || "all" } = "") => {
    setStorageData(newData);
    this.todos = getStorageData();
    this.status = status;
    this.fileteredTodos = handleData.onSetStatus(this.status);

    this.render(this.fileteredTodos);
  };

  this.render = (todos) => {
    this.todoList.setState(todos);
    this.todoCount.setState(todos);
  };

  this.init = () => {
    this.todos = getStorageData();

    try {
      this.todoInput = new TodoInput({ onAction: { add: handleData.onAdd } });
      this.todoList = new TodoList({
        onAction: {
          toggle: handleData.onToggle,
          remove: handleData.onRemove,
          change: handleData.onChange,
        },
      });
      this.todoCount = new TodoCount();
      this.todoStatus = new TodoStatus({
        onAction: { bind: handleData.onBindStatus },
      });
      this.render(this.todos);
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();

export const dispatch = (...newData) => {
  todoApp.setState(...newData);
};
