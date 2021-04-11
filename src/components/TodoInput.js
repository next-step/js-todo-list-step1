import { EventType, KeyType, TextType } from '../utils/constants.js';

export default class TodoInput {
  constructor({ onAdd }) {
    this.$input = document.querySelector('.new-todo');
    this.$input.addEventListener(EventType.KEY_DOWN, (event) => this.addTodoItem(event, onAdd));
  }

  addTodoItem(event, onAdd) {
    const { target, key } = event;
    if (key !== KeyType.ENTER) {
      return;
    }

    const content = target.value.trim();
    if (content === TextType.EMPTY) {
      return;
    }

    onAdd(content);
    target.value = TextType.EMPTY;
  }
}
