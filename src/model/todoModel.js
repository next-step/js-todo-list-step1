import Observer from "./observer.js";
import { STORAGE_KEY } from "../../utils/constants.js";
import { storage } from "../../utils/storage.js";

class TodoModel extends Observer {
  constructor() {
    super();
    this.todos = storage.get(STORAGE_KEY) || []; // filter 하지 않은 전체 Todo
    this.currentTodos = []; // 현재 렌더링하는 Todo
  }

  setTodos(todos) {
    this.currentTodos = todos;
    this.notify("todoChanged", this.currentTodos);
  }

  get(filterStatus) {
    return filterStatus ? this.currentTodos : this.todos;
  }

  create(text) {
    this.todos = [
      ...this.todos,
      {
        id: this.todos.length
          ? Math.max(...this.todos.map((todo) => todo.id)) + 1
          : 0,
        text,
        isCompleted: false,
      },
    ];
    this.setTodos(this.todos);
  }
}

export default new TodoModel();
