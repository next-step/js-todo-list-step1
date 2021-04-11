import { todoItemTemplate } from '../templates.js';

function TodoList({ onToggle, onDelete }) {
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

  listElement.addEventListener('click', clickItemEvent);

  this.render = (items = []) => {
    if (items.length === 0) return null;
    listElement.innerHTML = items
      .map((item) => todoItemTemplate(item))
      .join('');
  };
}

export default TodoList;
