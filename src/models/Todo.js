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

  getActiveTodos() {
    return this.todoItems.filter((todoItem) => !todoItem.complete);
  }

  getCompletedTodos() {
    return this.todoItems.filter((todoItem) => todoItem.complete);
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

  saveTodoItems() {
    todoStorage().setStorage(this.todoItems);
  }

  changeCompletedState(todoItemId) {
    this.getTodoItemById(todoItemId).complete = !this.getTodoItemById(todoItemId).complete;
    this.saveTodoItems();
  }

  removeTodoItem(todoItemId) {
    this.todoItems = this.todoItems.filter((todoItem) => todoItem.id !== parseInt(todoItemId));
    this.saveTodoItems();
  }

  editTodoItem(todoItem) {
    this.getTodoItemById(todoItem.id).name = todoItem.value;
    this.saveTodoItems();
  }

  getNewId() {
    const todoListLen = this.todoItems.length;
    return todoListLen === 0 ? 0 : this.todoItems[todoListLen - 1].id + 1;
  }

  getTodoItemById(todoItemId) {
    return this.todoItems.find((todoItem) => todoItem.id === parseInt(todoItemId));
  }
}
