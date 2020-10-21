import { createTodoTemplete } from '../templates/index.js';

class TodoItem {
  $targetUl;
  id;
  text;
  isActive;

  constructor($targetUl, { id, text, isActive }) {
    this.$targetUl = $targetUl;
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.render();
  }

  render() {
    const $todoItem = document.createElement('li');
    $todoItem.setAttribute('data-key', this.id);
    $todoItem.innerHTML = createTodoTemplete(this.text, this.isActive);
    if (!this.isActive) $todoItem.classList.add('completed');
    this.$targetUl.appendChild($todoItem);
  }
}

export default TodoItem;
