`use strcit`;

import TodoCount from './TodoCount.js';

class TodoList {
  constructor() {
    const $todoList = document.querySelector('#todo-list');

    $todoList.addEventListener('keyup', this.onKeyUp);
    $todoList.addEventListener('click', this.onClick.bind(this));
    $todoList.addEventListener('dblclick', this.onDblClick);

    this._$todoList = $todoList;
  }

  onKeyUp(event) {
    if (event.code === 'Escape') {
      const lis = document.querySelectorAll('li');

      for (const li of lis) {
        if (li.className === 'editing') {
          li.classList.remove('editing');
        }
      }
    }
  }

  onClick(event) {
    if (event.target && event.target.nodeName === 'INPUT') {
      let checked = event.target.checked;
      if (checked) {
        event.target.checked = true;
        event.target.parentElement.parentElement.className = 'completed';
      } else {
        event.target.checked = false;
        event.target.parentElement.parentElement.classList.remove('completed');
      }
    } else if (event.target && event.target.nodeName === 'BUTTON') {
      event.target.parentElement.parentElement.remove();

      TodoCount.update(this._$todoList.childElementCount);
    }
  }

  onDblClick(event) {
    if (event.target && event.target.nodeName === 'LABEL') {
      event.target.parentElement.parentElement.className = 'editing';
    }
  }

  addItem(todoItem) {
    if (todoItem) {
      this._$todoList.append(todoItem);

      return true;
    } else {
      return false;
    }
  }

  set $todoList(list) {
    this._$todoList = list;
  }

  get $todoList() {
    return this._$todoList;
  }
}

export default TodoList;
