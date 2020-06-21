import { validateType, defaultItem } from './util.js';
import { VALIDATION_TYPE } from './constants.js';
import { todoListTemplate } from './template.js';

const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

function TodoList(element) {
  this.$ul = element;
  this.todoList = [];

  this.$ul.addEventListener('click', e => {
    const { className } = e.target;
    const { id } = e.target.closest('li');
    if (className === 'destroy') {
      this.deleteItem(id);
    } else if (className === 'toggle') {
      this.toggleComplete(id);
    }
  });

  this.$ul.addEventListener('dblclick', e => {
    const { id } = e.target.closest('li');
    this.toggleEditMode(id);

    // for focus input & set cursor position
    const $list = document.getElementById(id);
    const [$editInput] = Array.from($list.getElementsByClassName('edit'));
    const size = $editInput.value.length;
    $editInput.focus();
    $editInput.setSelectionRange(size, size);
  });

  this.$ul.addEventListener('keyup', e => {
    const { id } = e.target.closest('li');
    if (e.keyCode === KEYCODE_ESC) {
      this.toggleEditMode(id);
    }
    const newValue = e.target.value;
    if (newValue === '') return null;
    if (e.keyCode === KEYCODE_ENTER) {
      this.editContents(id, newValue);
    }
  });

  this.addItem = value => {
    this.todoList = [defaultItem(value), ...this.todoList];
    this.render();
  };

  this.deleteItem = id => {
    const index = this.findIndexById(id);
    this.todoList = [...this.todoList.slice(0, index), ...this.todoList.slice(index + 1)];
    this.render();
  };

  this.toggleComplete = id => {
    const index = this.findIndexById(id);
    this.todoList[index].completed = !this.todoList[index].completed;
    this.render();
  };

  this.toggleEditMode = id => {
    const index = this.findIndexById(id);
    this.todoList[index].editing = !this.todoList[index].editing;
    this.render();
  }

  this.editContents = (id, value) => {
    const index = this.findIndexById(id);
    this.todoList[index].text = value;
    this.toggleEditMode(id);
    this.render();
  }

  this.findIndexById = id => {
    return this.todoList.findIndex(item => item.id === id);
  }

  this.render = () => {
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
  const newValue = e.target.value;
  if (newValue === '') return null;
  if (e.keyCode === KEYCODE_ENTER) {
    todoList.addItem(newValue);
    todoInput.setText('');
  }
};

const todoList = new TodoList(document.getElementById('todo-list'));
const todoInput = new TodoInput(document.getElementById('new-todo-title'), {
  addTodo
});