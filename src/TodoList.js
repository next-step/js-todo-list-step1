import {KEY} from './constants.js';

export default function TodoList($todoList, data, {removeItem, editItem}) {
  this.$todoList = $todoList;
  this.data = data;

  this.setState = () => {
    this.render();
    this.bindEvents();
  }

  this.updateItem = (nextData) => {
    this.data = [...nextData];
    this.setState();
  };

  this.bindEvents = () => {
    document.querySelectorAll('.todo-item').forEach(($item) => {
      $item.addEventListener('click', ({target}) => {
        if (target.tagName === 'INPUT' && target.classList.contains('toggle')) {
          const $todoItem = target.closest('.todo-item');
          const {index} = $todoItem.dataset;
          const item = this.data[index];
          const isCompleted = !$todoItem.classList.contains('completed');
          item.isCompleted = isCompleted;
          $todoItem.classList[isCompleted ? 'add' : 'remove']('completed');
        }

        if (target.classList.contains('destroy')) {
          const {index} = target.closest('.todo-item').dataset;
          removeItem(Number(index));
        }
      });

      $item.addEventListener('dblclick', ({target}) => {
        const $todoItem = target.closest('.todo-item');
        const {index} = target.closest('.todo-item').dataset;
        const oldValue = target.innerText;

        $todoItem.classList.add('editing');
        $todoItem.querySelector('.edit').focus();
        $todoItem.querySelector('.edit').setSelectionRange(oldValue.length, oldValue.length);
        $todoItem.addEventListener('keyup', ({key, target}) => {
          if (key === KEY.ESC) {
            target.value = oldValue;
            $todoItem.classList.remove('editing');
          } else if (key === KEY.ENTER) {
            editItem(index, target.value);
          }
        });
      });

      $item.addEventListener('focusout', ({target}) => {
        target.closest('.todo-item').classList.remove('editing');
      });
    });
  };

  this.render = () => {
    this.$todoList.innerHTML = this.data.map(({text, isCompleted}, index) => `
      <li class="todo-item ${isCompleted? 'completed' : ''}" data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted? 'checked' : ''} />
          <label class="label">${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}" />
      </li>
    `).join('');
  };

  this.setState();
}
