import { $, $$ } from '../utils/querySelector.js';

export default class TodoListView {
  constructor() {
    this._todoList = $('#todo-list');
  }

  add(todo) {
    const newTodo = this._createTodo(todo);
    this._todoList.appendChild(newTodo);
  }

  remove(todo) {
    const li = this._getTodoById(todo.id);
    if (!li) {
      return;
    }
    li.remove();
  }

  editStart(todo) {
    todo.classList.add('editing');
    const input = $('.edit', todo);
    input.focus();
  }

  editEnd(todo) {
    todo = todo instanceof Element ? todo : this._getTodoById(todo.id);
    todo.classList.remove('editing');
    const input = $('.edit', todo);
    input.value = '';
  }

  update(todo) {
    const oldTodo = this._getTodoById(todo.id);
    const newTodo = this._createTodo(todo);
    this._todoList.replaceChild(newTodo, oldTodo);
  }

  filterAll() {
    return this._filter('all');
  }

  filterActive() {
    return this._filter('active');
  }

  filterCompleted() {
    return this._filter('completed');
  }

  hide(todo) {
    const li = this._getTodoById(todo.id);
    if (!li) {
      return;
    }
    li.style.display = 'none';
  }

  setRemoveEvent(callback) {
    this._todoList.addEventListener('click', (event) => {
      if (!event.target.closest('.destroy')) {
        return;
      }
      const li = event.target.closest('li');
      callback(+li.dataset.id);
    });
  }

  setToggleEvent(callback) {
    this._todoList.addEventListener('click', (event) => {
      if (!event.target.closest('.toggle')) {
        return;
      }
      const li = event.target.closest('li');
      callback(+li.dataset.id);
    });
  }

  setEditStartEvent(callback) {
    this._todoList.addEventListener('dblclick', (event) => {
      const todo = event.target.closest('li');
      if (!todo) {
        return;
      }
      callback(todo);
    });
  }

  setEditEndEvent(callback) {
    this._todoList.addEventListener('focusout', (event) => {
      const todo = event.target.closest('li');
      if (!todo) {
        return;
      }
      callback(todo);
    });
  }

  setEditApplyEvent(callback) {
    this._todoList.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        return;
      }
      const input = event.target.closest('.edit');
      const todo = input.closest('li');
      callback(+todo.dataset.id, input.value);
    });
  }

  _getTodoById(id) {
    return $(`li[data-id='${id}']`, this._todoList);
  }

  _createTodo(todo) {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : 'active';
    li.dataset.id = todo.id;
    li.innerHTML = `
                    <div class="view">
                      <input class="toggle" type="checkbox"
                        ${todo.completed ? 'checked' : ''}/>
                      <label class="label">${todo.content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="" />`;
    return li;
  }

  _filter(selected) {
    const todos = $$('li', this._todoList);
    let count = 0;
    todos.forEach((todo) => {
      if (selected == 'all' || todo.classList.contains(selected)) {
        todo.style.display = 'block';
        count++;
      } else {
        todo.style.display = 'none';
      }
    });
    return count;
  }
}
