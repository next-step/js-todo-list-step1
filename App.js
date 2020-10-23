import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import TodoStatus from "./components/TodoStatus.js";
import { STATUS } from "./utils/constantsKey.js";

function App() {
  if (!(this instanceof App)) {
    throw new Error("error: App must be called with new!");
  }

  this.todos = [];

  const onAdd = (todo) => {
    const originTodos = this.todos;
    const newTodos = [...originTodos, { content: todo, isCompleted: false }];
    this.setState(newTodos);
  };

  const onToggle = (idx) => {
    const originTodos = this.todos;
    const newTodos = originTodos.map((todo, index) => {
      if (index === parseInt(idx)) {
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
      (todo, index) => index !== parseInt(idx)
    );
    this.setState(newTodos);
  };

  const onChange = ({ idx, content }) => {
    const originTodos = this.todos;
    const newTodos = originTodos.map((todo, index) => {
      if (index === parseInt(idx)) {
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

  const onFilter = (status) => {
    let filteredTodos;

    switch (status) {
      case STATUS.ACTIVE:
        filteredTodos = this.todos.filter((todo) => todo.isCompleted === false);
        break;
      case STATUS.COMPLETED:
        filteredTodos = this.todos.filter((todo) => todo.isCompleted === true);
        break;
      default:
        filteredTodos = this.todos;
    }

    return filteredTodos;
  };

  this.setState = (newData, { status } = "") => {
    this.todos = newData;
    this.fileteredTodos = status ? onFilter(status) : this.todos;

    this.render(this.fileteredTodos);
  };

  this.render = (todos) => {
    this.todoList.setState(todos);
    this.todoCount.setState(todos);
  };

  this.init = () => {
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

new App();
