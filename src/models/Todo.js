import todoStorage from '../todoStorage.js';

const tag = `[Todo]`;
export default class Todo {
  constructor() {
    console.log(`${tag} constructor()`);
    this.todoItems = todoStorage().getStorage() ? todoStorage().getStorage() : [];
  }

  getTodos() {
    console.log(`${tag} getTodos()`);
    return this.todoItems;
  }

  setTodos(newTodoName) {
    return {
      id: this.getNewId(),
      name: newTodoName,
      complete: false,
    };
  }

  addTodoItem(newTodoItemName) {
    console.log(`${tag} addTodoItem()`);
    this.todoItems.push(this.setTodos(newTodoItemName));
    todoStorage().setStorage(this.todoItems);
  }

  getNewId() {
    const todoListLen = this.todoItems.length;
    return todoListLen === 0 ? 0 : this.todoItems[todoListLen - 1].id + 1;
  }
}
