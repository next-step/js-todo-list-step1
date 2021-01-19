import todoStorage from '../todoStorage.js';

export default class Todo {
  constructor() {
    this.todoItems = todoStorage().getStorage() ? todoStorage().getStorage() : [];
  }

  getTodos() {
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
      value: newTodoName,
      complete: false,
    };
  }

  addTodoItem(newTodoItemName) {
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
    this.getTodoItemById(todoItem.id).value = todoItem.value;
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
