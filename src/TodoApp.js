import Component from "./core/Component.js";

export default class TodoApp extends Component {
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
      editTodo: editTodo.bind(this),
    });

    new TodoFilter($todoFilter, {
      countList: countList.bind(this),
      filterList: filterList.bind(this),
    });
  }

  get filteredList() {}

  addTodo(contents) {}

  toggleTodo() {}
  deleteTodo() {}
  editTodo() {}
  countTodo() {}
  filterTodoList() {}
}
