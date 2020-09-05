import {KEY} from './constants.js';

export default function TodoList($todoList, data, removeItem) {
  this.$todoList = $todoList;
  this.data = data;

  this.updateItem = (nextData) => {
    this.data = [...nextData];
    this.render();
    this.bindEvents();
  };

  this.editItem = (index, text) => {
    this.data[index].text = text;
    this.render();
    this.bindEvents();
  };

  this.bindEvents = () => {
    document.querySelectorAll('.todo-item').forEach(($item) => {
      $item.addEventListener('click', ({target}) => {
        if (target.tagName === 'INPUT' && target.classList.contains('toggle')) {
          const $todoItem = target.closest('.todo-item');
          const {index} = $todoItem.dataset;

          if ($todoItem.classList.contains('completed')) {
            $todoItem.classList.remove('completed');
            this.data[index].isCompleted = false;
          } else {
            $todoItem.classList.add('completed');
            this.data[index].isCompleted = true;
          }
        }

        if (target.classList.contains('destroy')) {
          const {index} = target.closest('.todo-item').dataset;
          removeItem(index);
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
            this.editItem(index, target.value);
          }
        });
      });

      $item.addEventListener('focusout', ({target}) => {
        target.closest('.todo-item').classList.remove('editing');
      });
    });
  };

  this.render = () => {
    let result = '';
    this.data.map(({text}, index) => {
      result += `
      <li class="todo-item ${data[index].isCompleted? 'completed' : ''}" data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox" ${data[index].isCompleted? 'checked' : ''} />
          <label class="label">${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}" />
      </li>
      `;
    }).join('');

    this.$todoList.innerHTML = result;
  };
}
