import { KEYCODE_ENTER, KEYCODE_ESC } from '../enum.js';
import { todoItemTemplate } from '../templates.js';

function TodoList({ onToggle, onDelete, onEdit }) {
  const listElement = document.getElementById('todo-list');

  const clickItemEvent = (e) => {
    const itemId = e.target.closest('li').id;
    if (e.target.className === 'toggle') {
      onToggle(itemId);
    }
    if (e.target.className === 'destroy') {
      onDelete(itemId);
    }
  };

  const doubleClickItemEvent = (e) => {
    const item = e.target.closest('li');
    if (e.target.className === 'label') {
      item.classList.add('editing');
      item.addEventListener('keydown', keydownItemEvent);
    }
  };

  const keydownItemEvent = (e) => {
    const item = e.target.closest('li');
    if (e.keyCode === KEYCODE_ENTER) {
      onEdit(item.id, e.target.value);
      item.classList.remove('editing');
    }
    if (e.keyCode === KEYCODE_ESC) {
      item.classList.remove('editing');
    }
  };

  listElement.addEventListener('click', clickItemEvent);
  listElement.addEventListener('dblclick', doubleClickItemEvent);

  this.render = (items = []) => {
    if (items.length === 0) listElement.innerHTML = '';
    listElement.innerHTML = items
      .map((item) => todoItemTemplate(item))
      .join('');
  };
}

export default TodoList;
