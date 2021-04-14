import { $, $$ } from '../utils/querySelector.js';

export default class TodoListView {
  constructor() {
    this.el = $('#todo-list');
  }

  add(todo) {
    const li = `
                <li data-id=${todo.id} class=${
      todo.completed ? 'completed' : 'active'
    }>
                  <div class="view">
                    <input class="toggle" type="checkbox"
                      ${todo.completed ? 'checked' : ''}/>
                    <label class="label">${todo.content}</label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="" />
                </li>`;
    this.el.insertAdjacentHTML('beforeend', li);
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
    const li = this._getTodoById(todo.id);
    if (!li) {
      return;
    }
    li.className = todo.completed ? 'completed' : 'active';
    li.innerHTML = `
                    <div class="view">
                      <input class="toggle" type="checkbox"
                      ${todo.completed ? 'checked' : ''}/>
                      <label class="label">${todo.content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="" />`;
  }

  filterAll() {
    const todos = $$('li', this.el);
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
    return todos.length;
  }

  filterActive() {
    let activeCount = 0;
    const todos = $$('li', this.el);
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      } else {
        activeCount++;
        todo.style.display = 'block';
      }
    });
    return activeCount;
  }

  filterCompleted() {
    let completedCount = 0;
    const todos = $$('li', this.el);
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'block';
        completedCount++;
      } else {
        todo.style.display = 'none';
      }
    });
    return completedCount;
  }

  hide(todo) {
    const li = this._getTodoById(todo.id);
    if (!li) {
      return;
    }
    li.style.display = 'none';
  }

  _getTodoById(id) {
    return $(`li[data-id='${id}']`, this.el);
  }

  setRemoveEvent(callback) {
    this.el.addEventListener('click', (event) => {
      if (!event.target.closest('.destroy')) {
        return;
      }
      const li = event.target.closest('li');
      callback(+li.dataset.id);
    });
  }

  setToggleEvent(callback) {
    this.el.addEventListener('click', (event) => {
      if (!event.target.closest('.toggle')) {
        return;
      }
      const li = event.target.closest('li');
      callback(+li.dataset.id);
    });
  }

  setEditStartEvent(callback) {
    this.el.addEventListener('dblclick', (event) => {
      const todo = event.target.closest('li');
      if (!todo) {
        return;
      }
      callback(todo);
    });
  }

  setEditEndEvent(callback) {
    this.el.addEventListener('focusout', (event) => {
      const todo = event.target.closest('li');
      if (!todo) {
        return;
      }
      callback(todo);
    });
  }

  setEditApplyEvent(callback) {
    this.el.addEventListener('keypress', (event) => {
      if (event.key !== 'Enter') {
        return;
      }
      const input = event.target.closest('.edit');
      const todo = input.closest('li');
      callback(+todo.dataset.id, input.value);
    });
  }
}
