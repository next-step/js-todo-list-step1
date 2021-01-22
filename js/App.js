import Main from "./components/Main.js";
import Title from "./components/Title.js";
import TodoForm from "./components/TodoForm.js";
import Reilly, { createElement } from "./lib/Reilly.js";
import { Todo } from "./types/index.js";

class App extends Reilly.Component {
  state = {
    todos: [{ id: 1, content: "Typescript", completed: false }],
    mode: "all"
  };

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    let content = e.target.elements["new-todo"].value;
    this.setState({ todos: [new Todo(content), ...this.state.todos] });
  }

  render() {
    return createElement(
      "div",
      { className: "todoapp" },
      createElement(Title, null, "☀️ Tasks ☀️"),
      createElement(TodoForm, { onsubmit: this.addTodo }),
      createElement(Main, { todoState: this.state })
    );
  }
}

export default App;
