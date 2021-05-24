import { $ } from '../utils/QuerySelector.js';
import { TodoItemClassName } from './TodoItem.js';
import { EventType } from '../utils/EventType.js';
import { KeyType } from '../utils/KeyType.js';
import { TextType } from '../utils/TextType.js';

const TodoItemStatus = Object.freeze({
  TOGGLE: 'toggle',
  EDITING: 'editing',
  DESTROY: 'destroy',
});

export default class TodoList {
  constructor(items, { onToggleItem, onEditItem, onDeleteItem }) {
    this.items = items;

    this.$todoListView = $('.todo-list');
    this.initializeEventListener(this.$todoListView, { onToggleItem, onEditItem, onDeleteItem });

    this.render(items);
  }

  initializeEventListener($todoListView, { onToggleItem, onEditItem, onDeleteItem }) {
    $todoListView.addEventListener(EventType.CLICK, (event) => {
      this.toggleItem(event, onToggleItem);
      this.deleteItem(event, onDeleteItem);
    });
    $todoListView.addEventListener(EventType.DOUBLE_CLICK, (event) => {
      this.enableEditMode(event);
    });
    $todoListView.addEventListener(EventType.KEY_DOWN, (event) => {
      this.disableEditMode(event);
      this.editItem(event, onEditItem);
    });
  }

  toggleItem(event, onToggleItem) {
    const { target } = event;
    if (!target.classList.contains(TodoItemStatus.TOGGLE)) {
      return;
    }

    const $itemView = target.closest(`.${TodoItemClassName}`);
    onToggleItem($itemView.dataset.id);
  }

  editItem(event, onEditItem) {
    const { target, key } = event;
    if (!this.isEditKeyType(key)) {
      return;
    }

    this.disableEditItem();

    const $itemView = target.closest(`.${TodoItemClassName}`);
    const $editItemField = $itemView.querySelector('.edit');

    const id = $itemView.dataset.id;
    const content = $editItemField.value.trim();
    if (content.length === 0) {
      return;
    }

    onEditItem(id, content);
  }

  isEditKeyType(key) {
    return key === KeyType.ENTER;
  }

  deleteItem(event, onDeleteItem) {
    const { target } = event;
    if (!target.classList.contains(TodoItemStatus.DESTROY)) {
      return;
    }

    const $itemView = target.closest(`.${TodoItemClassName}`);
    const id = $itemView.dataset.id;
    onDeleteItem(id);
  }

  enableEditMode(event) {
    const { target } = event;
    const $itemView = target.closest(`.${TodoItemClassName}`);

    if (this.isAlreadyEditMode($itemView)) {
      return;
    }

    this.enableEditItem($itemView);
    this.initializeInputField($itemView);
  }

  isAlreadyEditMode($todoItem) {
    return $todoItem.classList.contains(TodoItemStatus.EDITING);
  }

  enableEditItem($todoItem) {
    $todoItem.classList.add(TodoItemStatus.EDITING);
  }

  initializeInputField($todoItem) {
    const $editItemField = $todoItem.querySelector('.edit');
    $editItemField.focus();

    const $label = $todoItem.querySelector('.label');
    $editItemField.value = $label.textContent;

    const contentLength = $editItemField.value.length;
    $editItemField.setSelectionRange(contentLength, contentLength);
  }

  disableEditMode(event) {
    const { target, key } = event;
    if (!this.isDisableEditModeKeyType(key)) {
      return;
    }

    this.disableEditItem();
    this.revertInputField(target);
  }

  isDisableEditModeKeyType(key) {
    return key === KeyType.ESC;
  }

  disableEditItem() {
    const $editEnabledItem = this.$todoListView.querySelector(`.${TodoItemStatus.EDITING}`);
    if (!$editEnabledItem) {
      throw new Error('Editable todoItem is not exists.');
    }

    $editEnabledItem.classList.remove(TodoItemStatus.EDITING);
  }

  revertInputField(target) {
    const $itemView = target.closest(`.${TodoItemClassName}`);
    const $itemLabel = $itemView.querySelector('.label');
    const $editItemField = $itemView.querySelector('.edit');

    $editItemField.value = $itemLabel.textContent;
  }

  setState(updateTodoItems) {
    this.items = updateTodoItems;
    this.render(this.items);
  }

  render(todoItems) {
    this.$todoListView.innerHTML = todoItems.map((todoItem) => todoItem.render()).join(TextType.EMPTY);
  }
}
