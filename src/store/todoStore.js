import { action } from '../utils/action.js';

export default class TodoStore {
  constructor(todos) {
    this.todos = this.getLocalstorage('todos')
      ? this.getLocalstorage('todos')
      : todos;
    this.nextTodoId = this.todos[this.todos.length - 1].id + 1;

    this.subscribe();
    this.publish();
  }

  subscribe() {
    ['add', 'remove', 'toggle', 'fetch'].forEach((type) => {
      action.subscribe('view', `${type}Todo`, (e) =>
        this.setTodos(type, e.detail)
      );
    });
  }

  publish() {
    action.publish('store', 'update', this.todos);
  }

  setTodos(type, payload) {
    switch (type) {
      case 'add':
        this.todos = [...this.todos, { id: this.nextTodoId, ...payload }];
        this.nextTodoId += 1;
        break;
      case 'remove':
        this.todos = this.todos.filter((todo) => todo.id !== payload);
        break;
      case 'toggle':
        this.todos = this.todos.map((todo) =>
          todo.id === payload ? { ...todo, isDone: !todo.isDone } : todo
        );
        break;
      case 'fetch':
        break;
      default:
        break;
    }

    this.setLocalstorage('todos', this.todos);
    this.publish();
  }

  getLocalstorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalstorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
