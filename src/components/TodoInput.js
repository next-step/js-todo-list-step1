import { EventType } from '../utils/EventType.js';
import { KeyType } from '../utils/KeyType.js';
import { TextType } from '../utils/TextType.js';

export default class TodoInput {
  constructor({ onAddTodoItem }) {
    this.$input = document.querySelector('.new-todo');

    this.$input.addEventListener(EventType.KEY_DOWN, (event) => this.addTodoItem(event, onAddTodoItem));
  }

  addTodoItem(event, onAddTodoItem) {
    const { target, key } = event;
    const content = target.value.trim();

    if (key !== KeyType.ENTER) {
      return;
    }

    if (content === TextType.EMPTY) {
      return;
    }

    onAddTodoItem(content);

    target.value = TextType.EMPTY;
  }
}
