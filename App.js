import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";

function App() {
  if (!(this instanceof App)) {
    throw new Error("error: App must be called with new!");
  }

  // this.todos = [];
  this.todos = [{ content: "이별하기", isCompleted: false }];

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

  this.setState = (newData) => {
    this.todos = newData;
    this.render();
  };

  this.render = () => {
    this.todoList.setState(this.todos);
    this.todoCount.setState(this.todos);
  };

  this.init = () => {
    this.$input = document.querySelector("#new-todo-title");
    this.$list = document.querySelector("#todo-list");
    this.$count = document.querySelector(".todo-count strong");
    try {
      this.todoInput = new TodoInput(this.$input, { onAction: { add: onAdd } });
      this.todoList = new TodoList(this.$list, this.todos, {
        onAction: { toggle: onToggle, remove: onRemove, change: onChange },
      });
      this.todoCount = new TodoCount(this.$count, this.todos);
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

new App();
