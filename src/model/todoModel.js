import Observer from "./observer.js";
import { STORAGE_KEY, EVENT_NAME } from "../../utils/constants.js";
import { storage } from "../../utils/storage.js";

class TodoModel extends Observer {
  constructor() {
    super();
    this.todos = storage.get(STORAGE_KEY) || []; // filter 하지 않은 전체 Todo
    this.currentTodos = []; // 현재 렌더링하는 Todo
  }

  setTodos(todos) {
    this.currentTodos = todos; // filterStatus 아직 반영x
    this.notify(EVENT_NAME.TODO_CHANGED, this.currentTodos);
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
  } // 불변성 유지를 위해 Array 다시 생성

  edit(id, text) {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos = [
      ...this.todos.slice(0, targetIndex),
      {
        ...this.todos[targetIndex],
        text,
      },
      ...this.todos.slice(targetIndex + 1, this.todos.length),
    ];
    this.setTodos(this.todos);
  }

  remove(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.setTodos(this.todos);
  }

  toggle(id) {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos = [
      ...this.todos.slice(0, targetIndex),
      {
        ...this.todos[targetIndex],
        isCompleted: !this.todos[targetIndex].isCompleted,
      },
      ...this.todos.slice(targetIndex + 1, this.todos.length),
    ];
    this.setTodos(this.todos);
  }
}

export default new TodoModel();
