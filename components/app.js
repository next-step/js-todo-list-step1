import TodoHeader from './todoHeader.js';
import TodoList from './todoList.js';
import TodoInput from './todoInput.js';

export default class App {
  constructor() {
    try {
      this.todos = this.getStorage();
      const todoApp = document.querySelector('#todo-app');
      this.TodoHeaderComponent = new TodoHeader();
      this.todoListComponent = new TodoList(
        this.todos,
        this.toggleTodo.bind(this),
        this.removeTodo.bind(this)
      );
      this.todoInputComponent = new TodoInput(this.addTodo.bind(this));
    } catch (err) {
      console.error(err.message);
    }
  }

  getStorage() {
    const todos = localStorage.getItem('TODOS');
    return JSON.parse(todos) || [];
  }

  saveStorage(todos) {
    localStorage.setItem('TODOS', JSON.stringify(todos));
  }

  render() {
    this.saveStorage(this.todos);
    this.todoListComponent.setState(this.todos);
  }

  toggleTodo(targetIndex) {
    const targetTodo = this.todos[targetIndex];
    if (!this.todos[targetIndex]) {
      return false;
    }
    this.todos[targetIndex].toggle = !targetTodo.toggle;
    this.render();
  }

  removeTodo(targetIndex) {
    console.log('App -> removeTodo -> targetIndex', targetIndex);
    this.todos = this.todos.filter((todo, index) => index !== targetIndex);
    this.render();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}
