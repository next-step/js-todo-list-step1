import { validateType } from './util.js';
import { VALIDATION_TYPE } from './constants.js';
import { todoListTemplate } from './template.js';

const KEYCODE_ENTER = 13;

function TodoList(element) {
  this.$ul = element;
  this.todoList = [];

  this.$ul.addEventListener('click', e => {
    const { className } = e.target;
    const { id } = e.target.closest('li').dataset;
    if (className === 'destroy') {
      this.deleteItem(parseInt(id));
    } else if (className === 'toggle') {
      this.toggleComplete(id);
    }
  });

  this.addItem = value => {
    this.todoList = [{ text: value, completed: false }, ...this.todoList];
    this.render();
  };

  this.deleteItem = id => {
    if (!validateType(id, VALIDATION_TYPE.NUMBER)) {
      throw Error('Invalid id type');
    }
    this.todoList = [...this.todoList.slice(0, id), ...this.todoList.slice(id + 1)];
    this.render();
  }

  this.toggleComplete = index => {
    this.todoList[index].completed = !this.todoList[index].completed;
    this.render();
  };

  this.render = () => {
    console.log(todoListTemplate(this.todoList));
    this.$ul.innerHTML = todoListTemplate(this.todoList);
  };
}

function TodoInput(element, { addTodo }) {
  this.$input = element;
  this.$input.addEventListener('keypress', addTodo);
  this.setText = text => {
    this.$input.value = text;
  }
}

const addTodo = e => {
  if (e.keyCode === KEYCODE_ENTER) {
    todoList.addItem(e.target.value);
    todoInput.setText('');
  }
};

const todoList = new TodoList(document.getElementById('todo-list'));
const todoInput = new TodoInput(document.getElementById('new-todo-title'), {
  addTodo
});