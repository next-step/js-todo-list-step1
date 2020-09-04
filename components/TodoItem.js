import { createTodoTemplete } from '../templates';

class TodoItem {
  constructor($ul, { id, text, isActive }) {
    this.$ul = $ul;
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.render();
  }

  render() {
    const $li = document.createElement('li');
    $li.setAttribute('data-key', this.id);
    $li.innerHTML = createTodoTemplete(this.text, this.isActive);
    if (!this.isActive) $li.classList.add('completed');
    this.$ul.appendChild($li);
  }
}

export default TodoItem;
