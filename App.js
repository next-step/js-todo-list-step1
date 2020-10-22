import TodoInput from "./components/TodoInput.js";

function App() {
  if (!(this instanceof App)) {
    throw new Error("error: App must be called with new!");
  }

  this.todos = [];

  const onAdd = (todo) => {
    const originTodos = this.todos;
    const todos = [...originTodos, { content: todo, isCompleted: false }];
    this.setState(todos);
  };

  this.setState = (newData) => {
    this.todos = newData;
  };

  this.init = () => {
    this.$input = document.getElementById("new-todo-title");
    try {
      this.todoInput = new TodoInput(this.$input, { onAdd: onAdd });
    } catch (e) {
      console.log(error);
    }
  };
  this.init();
}

new App();
