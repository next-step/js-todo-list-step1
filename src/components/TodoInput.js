import { $ } from '../utils/utils.js';
import { DOM_ID, KEY } from '../constants/constatns.js';
import TodoState from '../store/todoState.js';

export default class TodoInput {
  constructor({ setTodoList }) {
    this.$target = $(DOM_ID.TODO_INPUT);

    this.todoState = TodoState;
    this.setTodoList = setTodoList;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('keyup', this._addTodo.bind(this));
  }

  _addTodo({ code }) {
    if (code !== KEY.ENTER) return;

    const todoValue = this.$target.value;
    if (todoValue === '') return null;

    const todoList = this.todoState.get();

    const todoItem = {
      id: todoList.length + 1,
      value: todoValue,
      isDone: false,
    };

    // 상태 업데이트
    const addedTodoList = todoList.concat(todoItem);
    this.setTodoList(addedTodoList);

    this._initInput();
  }

  _initInput() {
    this.$target.value = '';
  }
}
