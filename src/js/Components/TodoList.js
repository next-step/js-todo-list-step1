import { todoItemTemplate } from '../templates.js';

function TodoList({ onToggle }) {
  const listElement = document.getElementById('todo-list');

  this.render = (items = []) => {
    if (items.length === 0) return null;
    listElement.innerHTML = items
      .map((item) => todoItemTemplate(item))
      .join('');
  };

  const clickItemToggle = (e) => {
    if (e.target.className === 'toggle') {
      onToggle(e.target.closest('li').id);
    }
  };

  listElement.addEventListener('click', clickItemToggle);
}

export default TodoList;
