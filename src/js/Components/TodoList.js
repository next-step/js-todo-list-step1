import { todoItemTemplate } from '../templates.js';

function TodoList({ onToggle, onDelete, onEdit }) {
  const listElement = document.getElementById('todo-list');

  const clickItemEvent = (e) => {
    const itemId = e.target.closest('li').id;
    if (e.target.classList.contains('toggle')) {
      onToggle(itemId);
    }
    if (e.target.classList.contains('destroy')) {
      onDelete(itemId);
    }
  };

  const doubleClickItemEvent = (e) => {
    const item = e.target.closest('li');
    if (e.target.classList.contains('label')) {
      item.classList.add('editing');
    }
  };

  const keydownItemEvent = (e) => {
    const item = e.target.closest('li');

    if (!item.classList.contains('editing')) {
      return;
    }
    console.log(e.key);

    if (e.key === 'Enter') {
      onEdit(item.id, e.target.value);
      item.classList.remove('editing');
    }
    if (e.key === 'Esc' || e.key === 'Escape') {
      item.classList.remove('editing');
    }
  };

  listElement.addEventListener('click', clickItemEvent);
  listElement.addEventListener('dblclick', doubleClickItemEvent);
  listElement.addEventListener('keydown', keydownItemEvent);

  this.render = (items = []) => {
    if (items.length === 0) listElement.innerHTML = '';
    listElement.innerHTML = items
      .map((item) => todoItemTemplate(item))
      .join('');
  };
}

export default TodoList;
