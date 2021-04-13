import { EventType, KeyType, TagName, TextType } from '../utils/constants.js';

const TodoItemStatus = Object.freeze({
  TOGGLE: 'toggle',
  EDITING: 'editing',
  DESTROY: 'destroy',
});

export default class TodoList {
  constructor(todoItems, { onToggleTodoItem, onEditTodoItem, onDeleteTodoItem }) {
    this.todoItems = todoItems;
    this.$todoList = document.querySelector('.todo-list');

    this.$todoList.addEventListener(EventType.CLICK, (event) => {
      this.toggleTodoItem(event, onToggleTodoItem);
      this.deleteTodoItem(event, onDeleteTodoItem);
    });
    this.$todoList.addEventListener(EventType.DOUBLE_CLICK, (event) => {
      this.enableEditMode(event);
    });
    this.$todoList.addEventListener(EventType.KEY_DOWN, (event) => {
      this.disableEditMode(event);
      this.editTodoItem(event, onEditTodoItem);
    });

    this.render(todoItems);
  }

  toggleTodoItem(event, onToggleTodoItem) {
    const { target } = event;
    if (!target.classList.contains(TodoItemStatus.TOGGLE)) {
      return;
    }

    const $todoItem = target.closest(TagName.LIST);
    onToggleTodoItem($todoItem.dataset.id);
  }

  editTodoItem(event, onEditTodoItem) {
    const { target, key } = event;
    if (key !== KeyType.ENTER) {
      return;
    }

    const $enabledTodoItem = this.$todoList.querySelector(`.${TodoItemStatus.EDITING}`);
    if (!$enabledTodoItem) {
      return;
    }

    $enabledTodoItem.classList.remove(TodoItemStatus.EDITING);

    const $todoItem = target.closest(TagName.LIST);
    const $inputField = $todoItem.querySelector('.edit');

    const id = $todoItem.dataset.id;
    const content = $inputField.value.trim();
    if (content.length === 0) {
      return;
    }

    onEditTodoItem(id, content);
  }

  deleteTodoItem(event, onDeleteTodoItem) {
    const { target } = event;
    if (!target.classList.contains(TodoItemStatus.DESTROY)) {
      return;
    }

    const $todoItem = target.closest(TagName.LIST);
    const id = $todoItem.dataset.id;
    onDeleteTodoItem(id);
  }

  enableEditMode(event) {
    const { target } = event;
    const $todoItem = target.closest(TagName.LIST);

    if ($todoItem.classList.contains(TodoItemStatus.EDITING)) {
      return;
    }

    $todoItem.classList.add(TodoItemStatus.EDITING);

    const $inputField = $todoItem.querySelector('.edit');
    $inputField.focus();

    const contentLength = $inputField.value.length;
    $inputField.setSelectionRange(contentLength, contentLength);
  }

  disableEditMode(event) {
    const { key } = event;
    if (key !== KeyType.ESC) {
      return;
    }

    const $enabledTodoItem = this.$todoList.querySelector(`.${TodoItemStatus.EDITING}`);
    if (!$enabledTodoItem) {
      return;
    }

    $enabledTodoItem.classList.remove(TodoItemStatus.EDITING);
  }

  setState(updateTodoItems) {
    this.todoItems = updateTodoItems;
    this.render(this.todoItems);
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map((todoItem) => todoItem.render()).join(TextType.EMPTY);
  }
}
