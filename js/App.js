import Main from "./components/Main.js";
import Title from "./components/Title.js";
import TodoForm from "./components/TodoForm.js";
import Reilly, { createElement } from "./lib/Reilly.js";
import { FILTER_ENUM } from "./types/constants.js";
import { TodoState, Todo } from "./types/index.js";
import LocalStorage from "./utils/LocalStorage.js";

class App extends Reilly.Component {
  state = new TodoState([], FILTER_ENUM.ALL, null);

  constructor(props) {
    super(props);
    this.fetchTodos();
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.startEditTodo = this.startEditTodo.bind(this);
    this.confirmEditTodo = this.confirmEditTodo.bind(this);
  }

  fetchTodos() {
    this.setState({ todos: LocalStorage.fetchTodos() ?? [] });
  }

  addTodo(e) {
    e.preventDefault();

    const content = e.target.elements["new-todo"].value.trim();
    if (!content) return;

    const todos = [new Todo(content), ...this.state.todos];
    this.setState({ todos });
    LocalStorage.setTodos(todos);
  }

  toggleTodo(e) {
    e.stopPropagation();
    if (!e.target.matches(".toggle")) return;
    const targetId = e.path.find((elm) => elm.matches("li")).id;
    const todos = this.state.todos.map((todo) =>
      todo.id !== targetId
        ? todo
        : {
            ...todo,
            completed: !todo.completed,
            _updatedAt: new Date().toISOString()
          }
    );
    this.setState({ todos });
    LocalStorage.setTodos(todos);
  }

  removeTodo(e) {
    e.stopPropagation();
    if (!e.target.matches(".destroy")) return;
    if (!confirm("destroy this for real?")) return;
    const targetId = e.target.closest("li").id;
    const todos = this.state.todos.filter((todo) => todo.id !== targetId);
    this.setState({ todos });
    LocalStorage.setTodos(todos);
  }

  changeMode(e) {
    this.setState({
      mode: e.target.classList[0]
    });
  }

  startEditTodo(e) {
    if (!e.target.matches("label")) return;
    const edittingId = e.target.closest("li").id;
    this.setState({ edittingId });
  }

  confirmEditTodo(e) {
    e.stopPropagation();
    if (!(e.key === "Enter" || e.key === "Escape")) return;

    if (e.key === "Escape") {
      this.setState({
        edittingId: null
      });
      return;
    }

    const targetId = e.target.closest("li").id;
    const content = e.target.value;
    // content validation
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id !== targetId
          ? todo
          : { ...todo, content, _updatedAt: new Date().toISOString() }
      ),
      edittingId: null
    });
  }

  componentDidUpdate() {
    const targetId = this.state.edittingId;
    if (targetId) {
      window.onbeforeunload = () => "작성 중인 메시지가 있습니다.";
      document.getElementById(targetId).querySelector(".edit").focus();
    } else {
      window.onbeforeunload = null;
      document.querySelector("input").focus();
    }
  }

  render() {
    const { todos, mode, edittingId } = this.state;

    return createElement(
      "div",
      { className: "todoapp" },
      createElement(Title, null, "todos"),
      createElement(TodoForm, { onsubmit: this.addTodo }),
      createElement(Main, {
        todos,
        mode,
        edittingId,
        onToggle: this.toggleTodo,
        onRemove: this.removeTodo,
        onModeChange: this.changeMode,
        onStartEdit: this.startEditTodo,
        onConfirmEdit: this.confirmEditTodo
      })
    );
  }
}

export default App;
