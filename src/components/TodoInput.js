import { EventType, KeyType, TextType } from '../utils/constants.js';

export default class TodoInput {
  constructor({ onAddTodoItem }) {
    this.$input = document.querySelector('.new-todo');
    this.$input.addEventListener(EventType.KEY_DOWN, (event) => this.addTodoItem(event, onAddTodoItem));
  }

  addTodoItem(event, onAddTodoItem) {
    const { target, key } = event;
    if (key !== KeyType.ENTER) {
      return;
    }

    const content = target.value.trim();
    if (content === TextType.EMPTY) {
      return;
    }

    onAddTodoItem(content);
    target.value = TextType.EMPTY;
  }
}
