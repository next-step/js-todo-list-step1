import { EventType, TagName, TextType } from '../utils/constants.js';

export const ClassName = {
  TOGGLE: 'toggle',
  DESTROY: 'destroy',
};

export default class TodoList {
  constructor(todoItems, { onToggleTodoItem, onDeleteTodoItem }) {
    this.$todoList = document.querySelector('.todo-list');
    this.$todoList.addEventListener(EventType.CLICK, (event) => {
      this.toggleTodoItem(event, onToggleTodoItem);
      this.deleteTodoItem(event, onDeleteTodoItem);
    });
    this.todoItems = todoItems;
    this.render(todoItems);
  }

  toggleTodoItem(event, onToggleTodoItem) {
    const { target } = event;
    if (!target.classList.contains(ClassName.TOGGLE)) {
      return;
    }

    const $todoItem = target.closest(TagName.LIST);
    onToggleTodoItem($todoItem.dataset.id);
  }

  deleteTodoItem(event, onDeleteTodoItem) {
    const { target } = event;
    if (!target.classList.contains(ClassName.DESTROY)) {
      return;
    }

    const $todoItem = target.closest(TagName.LIST);
    onDeleteTodoItem($todoItem.dataset.id);
  }

  setState(updateTodoItems) {
    this.todoItems = updateTodoItems;
    this.render(this.todoItems);
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map((todoItem) => todoItem.render()).join(TextType.EMPTY);
  }
}
