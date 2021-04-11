import { TextType } from '../utils/constants.js';

export default class TodoList {
  constructor(todoItems) {
    this.$todoList = document.querySelector('.todo-list');
    this.todoItems = todoItems;
    this.render(todoItems);
  }

  setState(updateTodoItems) {
    this.todoItems = updateTodoItems;
    this.render(this.todoItems);
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map((todoItem) => todoItem.render()).join(TextType.EMPTY);
  }
}
