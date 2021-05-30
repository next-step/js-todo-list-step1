import { $ } from '../utils/utils.js';
import { DOM_ID } from '../constants/constatns.js';

// components
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

// const init = [];
const init = [
  { id: 1, value: '1', isDone: false },
  { id: 2, value: '2', isDone: false },
  { id: 3, value: '3', isDone: false },
];

export default class TodoApp {
  constructor() {
    this.todoListState = init;

    new TodoInput({ target: $(DOM_ID.TODO_INPUT), addTodo: this.addTodo.bind(this) });
    this.todoList = new TodoList({
      target: $(DOM_ID.TODO_LIST),
      removeTodo: this.removeTodo.bind(this),
      toggleTodoItemIsDone: this.toggleTodoItemIsDone.bind(this),
      updateTodoItemValue: this.updateTodoItemValue.bind(this),
    });
    this.todoCount = new TodoCount({ target: $(DOM_ID.TODO_COUNT) });

    this._render();
  }

  addTodo(todoValue) {
    const todoItem = {
      id: this.todoListState.length + 1,
      value: todoValue,
      isDone: false,
    };
    // 상태 변경
    this.todoListState = this.todoListState.concat(todoItem);

    // 상태 변경 후 렌더링
    this._render();
  }

  toggleTodoItemIsDone(todoId) {
    this.todoListState = this.todoListState.map((todoItem) => {
      return todoItem.id == todoId ? { ...todoItem, isDone: !todoItem.isDone } : todoItem;
    });

    this._render();
  }

  updateTodoItemValue(todoId, value) {
    this.todoListState = this.todoListState.map((todoItem) => {
      return todoItem.id == todoId ? { ...todoItem, value } : todoItem;
    });

    this._render();
  }

  removeTodo(todoId) {
    this.todoListState = this.todoListState.filter((todoItem) => todoItem.id !== todoId);
    this._render();
  }

  _render() {
    this.todoList.render(this.todoListState);
    this.todoCount.updateCount(this.todoListState.length);
  }
}
