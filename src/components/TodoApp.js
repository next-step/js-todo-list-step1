import { $ } from '../utils/utils.js';
import { DOM_ID } from '../constants/constatns.js';

// components
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default class TodoApp {
  constructor() {
    this.todoListState = [{ id: 0, value: 'test', isDone: false }];

    new TodoInput($(DOM_ID.TODO_INPUT), this.addTodoList.bind(this));
    this.todoList = new TodoList($(DOM_ID.TODO_LIST));
    this.todoList.render(this.todoListState);
  }

  addTodoList(todoValue) {
    const todoItem = {
      id: this.todoListState.length,
      value: todoValue,
      isDone: false,
    };
    // 상태 변경
    this.todoListState = this.todoListState.concat(todoItem);

    // 상태 변경 후 렌더링
    this._redner();
  }

  _redner() {
    this.todoList.render(this.todoListState);
  }
}
