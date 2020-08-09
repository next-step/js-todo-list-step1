import Observer from "./observer.js";
import {
  STORAGE_KEY,
  EVENT_NAME,
  ALL,
  ACTIVE,
  COMPLETED,
} from "../../utils/constants.js";
import { storage } from "../../utils/storage.js";

class TodoModel extends Observer {
  constructor() {
    super();
    this.todos = storage.get(STORAGE_KEY) || []; // 그냥 전체 Todo
    this.filterTodosByType(this.todos);

    this.filterType = ALL;
    this.currentTodos = this.todosByFilter.get(this.filterType); // 렌더해야하는 Todo > 초기 타입은 'ALL'
  }

  filterTodosByType(todos) {
    this.todosByFilter = new Map();
    this.todosByFilter.set(ALL, todos.concat()); // 불변성 유지를 위해 Array 다시 생성
    this.todosByFilter.set(
      ACTIVE,
      todos.filter((todo) => !todo.isCompleted)
    );

    this.todosByFilter.set(
      COMPLETED,
      todos.filter((todo) => todo.isCompleted)
    );
  }

  setTodos() {
    storage.set(STORAGE_KEY, this.todos);
    this.currentTodos = this.todosByFilter.get(this.filterType);
    this.notify(EVENT_NAME.TODO_CHANGED, this.currentTodos);
  }

  get() {
    return this.currentTodos;
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

    this.filterTodosByType(this.todos);
    this.setTodos();
  }

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

    this.filterTodosByType(this.todos);
    this.setTodos();
  }

  remove(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.filterTodosByType(this.todos);
    this.setTodos();
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

    this.filterTodosByType(this.todos);
    this.setTodos();
  }

  changeFilterType(type) {
    this.filterType = type;
    this.setTodos();
  }
}

export default new TodoModel();
