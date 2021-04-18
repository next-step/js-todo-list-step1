import { $ } from '../utils/QuerySelector.js';
import { EventType } from '../utils/EventType.js';
import { KeyType } from '../utils/KeyType.js';
import { TextType } from '../utils/TextType.js';

export default class TodoInput {
  constructor({ onAddItem }) {
    this.$input = $('.new-todo');
    this.initializeEventListener(this.$input, { onAddItem });
  }

  initializeEventListener($input, { onAddItem }) {
    $input.addEventListener(EventType.KEY_DOWN, (event) => this.addItem(event, onAddItem));
  }

  addItem(event, onAddItem) {
    const { target, key } = event;
    const content = target.value.trim();

    if (!this.canAddItem(key, content)) {
      return;
    }

    onAddItem(content);

    this.clearContent(target);
  }

  canAddItem(key, content) {
    return this.isAddKeyType(key) && !this.isContentEmpty(content);
  }

  isAddKeyType(key) {
    return key === KeyType.ENTER;
  }

  isContentEmpty(content) {
    return content === TextType.EMPTY;
  }

  clearContent(target) {
    target.value = TextType.EMPTY;
  }
}
