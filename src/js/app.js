import LocalStorage from './LocalStorage.js';
import { $ } from './utils.js';

class App {
  constructor() {
    this.storage = new LocalStorage();
  }

  getHTMLElements(todos) {
    return todos.map(todo => {
      const template = document.createElement('template');
      template.innerHTML = `<li>
					<div class="view">
						<input class="toggle" type="checkbox" />
						<label class="label"></label>
						<button class="destroy"></button>
					</div>
					<input class="edit" />
				</li>`;

      const $li = template.content.firstElementChild;
      $li.className = todo.isComplete && 'completed';
      $li.dataset.id = todo.id;

      const $checkbox = $li.querySelector('.toggle');
      $checkbox.checked = todo.isComplete;

      const $label = $li.querySelector('.label');
      const $edit = $li.querySelector('.edit');
      $label.textContent = todo.title;
      $edit.value = todo.title;

      return $li;
    });
  }

  getRenderType() {
    const $buttons = document.querySelectorAll('.filters li a');
    const selected = Array.prototype.find.call($buttons, el =>
      el.className.includes('selected')
    );
    return selected.classList[0];
  }

  getFilteredTodos(type) {
    switch (type) {
      case 'active':
        return this.storage.todos.filter(todo => !todo.isComplete);
      case 'completed':
        return this.storage.todos.filter(todo => todo.isComplete);
      case 'all':
      default:
        return this.storage.todos;
    }
  }

  onRenderTodos(type) {
    if (this.storage.todos.length === 0) {
      return;
    }

    const $todoList = $('#todo-list');
    while ($todoList.firstChild) {
      $todoList.removeChild($todoList.firstChild);
    }

    const todos = this.getFilteredTodos(type);
    const elements = this.getHTMLElements(todos);
    elements.map(element => $todoList.appendChild(element));
  }

  onRenderCnt(type) {
    let cnt;
    if (this.storage.todos.length === 0) {
      cnt = 0;
    } else {
      cnt = this.getFilteredTodos(type).length;
    }
    const $todoCnt = $('.todo-count strong');
    $todoCnt.textContent = cnt;
  }

  onAddTodo(e) {
    if (e.key !== 'Enter') {
      return;
    }
    this.storage.addTodo(e.target.value);
    e.target.value = '';

    const type = this.getRenderType();
    this.onRenderTodos(type);
    this.onRenderCnt(type);
  }

  onToggleTodo(e) {
    if (e.target.className !== 'toggle') {
      return;
    }
    const $li = e.target.closest('li');
    $li.classList.toggle('completed');

    this.storage.toggleTodo(parseInt($li.dataset.id, 10));

    const type = this.getRenderType();
    type !== 'all' && this.onRenderTodos(type);
    this.onRenderCnt(type);
  }

  onDeleteTodo(e) {
    if (e.target.className !== 'destroy') {
      return;
    }
    const $li = e.target.closest('li');
    $li.remove();

    this.storage.deleteTodo(parseInt($li.dataset.id, 10));
    this.onRenderCnt(this.getRenderType());
  }

  onClickFilterButton(e) {
    if (e.target.tagName !== 'A' || e.target.className.includes('selected')) {
      return;
    }

    const $buttons = document.querySelectorAll('.filters li a');
    for (const button of $buttons) {
      button.classList.length > 1 && button.classList.remove('selected');
    }
    e.target.classList.add('selected');

    const type = this.getRenderType();
    this.onRenderTodos(type);
    this.onRenderCnt(type);
  }

  onChangeMode(e) {
    const currentMode = e.key ? 'edit' : 'view';
    const $li = e.target.closest('li');
    if (currentMode === 'view') {
      e.target.tagName === 'LABEL' && $li.classList.add('editing');
    } else {
      if (e.key === 'Escape') {
        $li.classList.remove('editing');
        const id = parseInt($li.dataset.id, 10);
        e.target.value = this.storage.todos.find(todo => todo.id === id).title;
      }
    }
  }

  onChangeTitle(e) {
    if (e.key !== 'Enter') {
      return;
    }

    const { value } = e.target;
    const $li = e.target.closest('li');
    const id = parseInt($li.dataset.id, 10);
    const $label = $(`[data-id="${id}"] .view .label`);

    this.storage.editTodo({
      id,
      key: 'title',
      value,
    });
    $label.innerText = value;
    $li.classList.remove('editing');
  }

  setEventListeners() {
    const $inputTitle = $('#new-todo-title');
    const $todoList = $('#todo-list');
    const $buttons = $('.filters');

    $buttons.addEventListener('click', this.onClickFilterButton.bind(this));
    $inputTitle.addEventListener('keydown', this.onAddTodo.bind(this));
    $todoList.addEventListener('click', this.onToggleTodo.bind(this));
    $todoList.addEventListener('click', this.onDeleteTodo.bind(this));

    $todoList.addEventListener('dblclick', this.onChangeMode.bind(this));
    $todoList.addEventListener('keydown', this.onChangeMode.bind(this));
    $todoList.addEventListener('keydown', this.onChangeTitle.bind(this));
  }

  init() {
    this.setEventListeners();
    this.onRenderTodos();
    this.onRenderCnt();
  }
}

const app = new App();
app.init();
