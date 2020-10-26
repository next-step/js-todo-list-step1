import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import TodoStatus from "./components/TodoStatus.js";
import { STATUS } from "./utils/constantsKey.js";
import { getStorageData, setStorageData } from "./utils/handleData.js";

function App(storageKey) {
  if (!new.target) throw new Error("error: App must be called with new!");

  const onAdd = (inputVal) => {
    const originTodos = this.todos;
    const newTodos = [
      ...originTodos,
      { content: inputVal, isCompleted: false },
    ];
    this.setState(newTodos);
  };

  const onToggle = (idx) => {
    const originTodos = this.todos;
    const newTodos = originTodos.map((todo, index) => {
      if (index === parseInt(idx, 10)) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    this.setState(newTodos);
  };

  const onRemove = (idx) => {
    const originTodos = this.todos;
    const newTodos = originTodos.filter(
      (todo, index) => index !== parseInt(idx, 10)
    );
    this.setState(newTodos);
  };

  const onChange = ({ idx, content }) => {
    const originTodos = this.todos;
    const newTodos = originTodos.map((todo, index) => {
      if (index === parseInt(idx, 10)) {
        return {
          ...todo,
          content: content,
        };
      }
      return todo;
    });
    this.setState(newTodos);
  };

  const onBindStatus = (status) => {
    this.setState(this.todos, { status: status });
  };

  const onSetStatus = (status) => {
    const todosBy = {
      [STATUS.ACTIVE]: this.todos.filter((todo) => !todo.isCompleted),
      [STATUS.COMPLETED]: this.todos.filter((todo) => todo.isCompleted),
    };
    return todosBy[status] || this.todos;
  };

  this.setState = (newData, { status } = "") => {
    setStorageData(storageKey, newData);
    this.todos = getStorageData(storageKey);
    this.fileteredTodos = status ? onSetStatus(status) : this.todos;

    this.render(this.fileteredTodos);
  };

  this.render = (todos) => {
    this.todoList.setState(todos);
    this.todoCount.setState(todos);
  };

  this.init = () => {
    this.storageKey = storageKey;
    this.todos = getStorageData(this.storageKey);
    this.$input = document.querySelector("#new-todo-title");
    this.$list = document.querySelector("#todo-list");
    this.$count = document.querySelector(".todo-count strong");
    this.$filters = document.querySelector("ul.filters");

    try {
      this.todoInput = new TodoInput(this.$input, { onAction: { add: onAdd } });
      this.todoList = new TodoList(this.$list, this.todos, {
        onAction: { toggle: onToggle, remove: onRemove, change: onChange },
      });
      this.todoCount = new TodoCount(this.$count, this.todos);
      this.todoStatus = new TodoStatus(this.$filters, {
        onAction: { bind: onBindStatus },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

new App("todoData");
