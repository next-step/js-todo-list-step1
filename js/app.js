import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import { defaultItem } from './util.js';
import { todoListTemplate } from './template.js';

function App() {
  this.todoList = [];

  this.addTodo = value => {
    this.todoList = [defaultItem(value), ...this.todoList];
    this.render();
  };
  
  this.deleteTodo = id => {
    const index = this.findIndexById(id);
    this.todoList = [...this.todoList.slice(0, index), ...this.todoList.slice(index + 1)];
    this.render();
  };
  
  this.toggleTodo = id => {
    const index = this.findIndexById(id);
    this.todoList[index].completed = !this.todoList[index].completed;
    this.render();
  };
  
  this.toggleEditMode = id => {
    const index = this.findIndexById(id);
    this.todoList[index].editing = !this.todoList[index].editing;
    this.render();
  };
  
  this.editTodo = (id, value) => {
    const index = this.findIndexById(id);
    this.todoList[index].text = value;
    this.toggleEditMode(id);
    this.render();
  };
  
  this.findIndexById = id => {
    return this.todoList.findIndex(item => item.id === id);
  };
  
  this.getTodoCount = () => {
    return this.todoList.length;
  };

  this.render = () => {
    this.TodoList.$ul.innerHTML = todoListTemplate(this.todoList);
    this.$todoCount.innerHTML = `총 <strong>${this.getTodoCount()}</strong> 개`;
  };

  this.TodoList = new TodoList(document.getElementById('todo-list'), {
    deleteTodo: this.deleteTodo,
    toggleTodo: this.toggleTodo,
    toggleEditMode: this.toggleEditMode,
    editTodo: this.editTodo
  });
  this.TodoInput = new TodoInput(document.getElementById('new-todo-title'), {
    addTodo: this.addTodo
  });
  this.$todoCount = document.getElementsByClassName('todo-count')[0];
}

new App();