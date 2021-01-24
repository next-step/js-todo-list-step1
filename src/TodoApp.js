import Component from "./core/Component.js";
import TodoAppender from "./components/TodoAppender.js";
import TodoList from "./components/TodoList.js";
import TodoFilter from "./components/TodoFilter.js";
export default class TodoApp extends Component {
  setup() {
    this.$state = {
      typeOfFilter: "all",
      todos: [
        {
          seq: 1,
          contents: "todo 1",
          state: "doing",
          edit: "",
        },
        {
          seq: 2,
          contents: "todo 2",
          state: "doing",
          edit: "",
        },
        {
          seq: 3,
          contents: "todo 3",
          state: "completed",
          edit: "",
        },
      ],
    };
  }
  template() {
    return `
      <h1>TODOS</h1>
      <input id="new-todo-title" class="new-todo" placeholder="할일을 추가해주세요" autofocus></input>
      <main>
        <input class="toggle-all" type="checkbox"/>
          <ul id="todo-list" class="todo-list"></ul>
          <div id="todo-filter" class="count-container"></div>
      </main>
    `;
  }

  mounted() {
    const {
      filteredList,
      addTodo,
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      filterList,
    } = this;
    const $todoAppender = this.$target.querySelector("#new-todo-title");
    const $todoList = this.$target.querySelector("#todo-list");
    const $todoFilter = this.$target.querySelector("#todo-filter");
    new TodoAppender($todoAppender, {
      addTodo: addTodo.bind(this),
    });

    new TodoList($todoList, {
      filteredList,
      toggleTodo: toggleTodo.bind(this),
      deleteTodo: deleteTodo.bind(this),
      onEditingMode: onEditingMode.bind(this),
      editTodo: editTodo.bind(this),
    });

    new TodoFilter($todoFilter, {
      typeOfFilter: this.$state.typeOfFilter,
      filteredList,
      filterList: filterList.bind(this),
    });
  }

  get filteredList() {
    const { typeOfFilter, todos } = this.$state;
    return todos.filter(({ state }) => {
      return typeOfFilter === "all" || typeOfFilter === state;
    });
  }

  addTodo(contents) {
    const { todos } = this.$state;
    const seq = Math.max(0, ...todos.map((todo) => todo.seq)) + 1;
    const state = "doing";
    this.setState({
      todos: [...todos, { seq, state, contents }],
    });
  }

  toggleTodo(seq) {
    const { todos } = this.$state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    if (todos[index].state === "doing") {
      todos[index].state = "completed";
    } else if (todos[index].state === "completed") {
      todos[index].state = "doing";
    }
    this.setState({ todos });
  }
  deleteTodo(seq) {
    const { todos } = this.$state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    todos.splice(index, 1);
    this.setState({ todos });
  }
  onEditingMode(seq) {
    const { todos } = this.$state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    if (todos[index].edit === "editing") {
      todos[index].edit = "";
    } else if (todos[index].edit === "") {
      todos[index].edit = "editing";
    }
    this.setState({ todos });
  }
  editTodo(seq, editingContents) {
    const { todos } = this.$state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    todos[index].contents = editingContents;
    this.onEditingMode(seq);
    this.setState({ todos });
  }
  filterList(typeOfFilter) {
    this.setState({ typeOfFilter });
  }
}
