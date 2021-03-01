'use strict';

const FilterType = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

class TodoItem {
  constructor(text, id, completed = false) {
    this.text = text;
    this.id = id;
    this.completed = completed;
  }
}

export default class TodoList {
  constructor() {
    this.$todoList = document.querySelector('.todo-list');
    this.$todoCount = document.querySelector('.todo-count');
    this.$countText = this.$todoCount.querySelector('strong');
    this.$todoList.addEventListener('click', this.onClickTodoList);
    this.$todoList.addEventListener('dblclick', this.onDoubleClickTodoList);
    this.$todoList.addEventListener('keyup', this.onKeyUpTodoList);
    this.todoItems = [];
    this.filterOption = FilterType.all;
  }

  onClickTodoList = event => {
    const target = event.target;
    if (!target.matches('.destroy') && !target.matches('.toggle')) return;
    if (target.matches('.destroy')) this.deleteItem(target);
    else if (target.matches('.toggle')) this.toggleItem(target);
    this.save();
  };

  onDoubleClickTodoList = event => {
    const target = event.target;
    if (!target.matches('.label')) return;
    this.openEditMode(target);
  };

  onKeyUpTodoList = event => {
    if (event.key !== 'Enter' && event.key !== 'Escape') return;
    if (event.key == 'Enter') {
      this.editItem(event.target);
      this.save();
    } else if (event.key === 'Escape') {
      this.closeEditMode(event.target);
    }
  };

  addNewItem(text, id) {
    const todoItem = new TodoItem(text, id);
    this.todoItems.push(todoItem);
  }

  render() {
    this.clearTodoList();
    switch (this.filterOption) {
      case FilterType.all:
        this.todoItems.forEach(item => {
          this.renderItem(item.text, item.id, item.completed);
        });
        break;
      case FilterType.active:
        this.todoItems.forEach(item => {
          if (item.completed === false)
            this.renderItem(item.text, item.id, item.completed);
        });
        break;
      case FilterType.completed:
        this.todoItems.forEach(item => {
          if (item.completed === true)
            this.renderItem(item.text, item.id, item.completed);
        });
        break;
    }
    this.count();
  }

  renderItem(text, id, completed = false) {
    const $todoItem = this._createTodoItem(text, id, completed);
    this.$todoList.append($todoItem);
  }

  _createTodoItem(text, id, completed = false) {
    const $li = document.createElement('li');
    $li.setAttribute('data-id', id);
    $li.innerHTML = this._getTodoItemTemplate(text);
    if (completed) {
      $li.classList.add('completed');
      $li.querySelector('.toggle').checked = true;
    }
    return $li;
  }

  _getTodoItemTemplate(text) {
    const template = `
		  <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">${text}</label>
        <button class="destroy"></button>
		  </div>
		  <input class="edit" value="${text}" />
		`;
    return template;
  }

  deleteItem(eventTarget) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const targetID = eventTarget.closest('li').dataset.id;
    this.todoItems.forEach((item, index) => {
      if (item.id === targetID) this.todoItems.splice(index, 1);
    });
    this.render();
  }

  toggleItem(eventTarget) {
    const $targetItem = eventTarget.closest('li');
    const targetID = $targetItem.dataset.id;
    if ($targetItem.className === '') {
      $targetItem.classList.add('completed');
      this.todoItems.forEach(item => {
        if (item.id === targetID) item.completed = true;
      });
    } else {
      $targetItem.classList.remove('completed');
      this.todoItems.forEach(item => {
        if (item.id === targetID) item.completed = false;
      });
    }
    this.render();
  }

  openEditMode(eventTarget) {
    const $targetItem = eventTarget.closest('li');
    $targetItem.classList.add('editing');
  }

  closeEditMode(eventTarget) {
    const $targetItem = eventTarget.closest('li');
    $targetItem.classList.remove('editing');
  }

  editItem(eventTarget) {
    const $targetItem = eventTarget.closest('li');
    const targetID = $targetItem.dataset.id;
    const $label = $targetItem.querySelector('.label');
    const text = $targetItem.querySelector('.edit').value;
    $label.innerText = text;
    this.todoItems.forEach(item => {
      if (item.id === targetID) item.text = text;
    });
    $targetItem.classList.remove('editing');
  }

  clearTodoList() {
    this.$todoList.innerHTML = '';
  }

  count() {
    const $todoItems = this.$todoList.querySelectorAll('li');
    const count = $todoItems.length;
    this.$countText.innerText = count;
  }

  save() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  load() {
    const loadedTodoItems = localStorage.getItem('todoItems');
    const parsedTodoItems = JSON.parse(loadedTodoItems);
    if (!parsedTodoItems) return;
    this.todoItems = parsedTodoItems;
    this.render();
  }
}
