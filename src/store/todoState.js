const init = [
  { id: 1, value: '1', isDone: false },
  { id: 2, value: '2', isDone: true },
  { id: 3, value: '3', isDone: false },
];

class TodoState {
  constructor() {
    this._todoList = init;
  }

  get() {
    return this._todoList;
  }

  setTodoList(updateTodoList) {
    this._todoList = updateTodoList;
  }
}

export default new TodoState();
