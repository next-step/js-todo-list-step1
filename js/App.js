import Main from "./components/Main.js";
import Title from "./components/Title.js";
import TodoForm from "./components/TodoForm.js";
import Reilly, { createElement } from "./lib/Reilly.js";
import { Todo } from "./types/index.js";

class App extends Reilly.Component {
  state = {
    todos: [
      { id: "234", content: "Typescript", completed: false },
      { id: "r4564", content: "React", completed: true }
    ],
    mode: "all"
  };

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    let content = e.target.elements["new-todo"].value.trim();
    if (!content) return;
    this.setState({ todos: [new Todo(content), ...this.state.todos] });
  }

  toggleTodo(e) {
    e.stopPropagation();
    if (!e.target.matches(".toggle")) return;
    const targetId = e.path.find((elm) => elm.matches("li")).id;
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id !== targetId ? todo : { ...todo, completed: !todo.completed }
      )
    });
  }

  removeTodo(e) {
    e.stopPropagation();
    if (!e.target.matches(".destroy")) return;
    if (!confirm("destroy this for real?")) return;
    const targetId = e.path.find((elm) => elm.nodeName === "LI").id;
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== targetId)
    });
  }

  changeMode(e) {
    this.setState({
      mode: e.target.classList[0]
    });
  }

  updateTodo(e) {
    console.log(e.target);
  }

  render() {
    const { todos, mode } = this.state;

    return createElement(
      "div",
      { className: "todoapp" },
      createElement(Title, null, "todos"),
      createElement(TodoForm, { onsubmit: this.addTodo }),
      createElement(Main, {
        todos,
        mode,
        onToggle: this.toggleTodo,
        onRemove: this.removeTodo,
        onModeChange: this.changeMode
      })
    );
  }
}

export default App;
