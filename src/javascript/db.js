export default class DB {
  constructor(userName) {
    // NOTE: todo 에는 id, completed여부, content 가 들어온다.
    this.userName = userName;
    this.todos = JSON.parse(localStorage.getItem(this.userName)) ?? [];
    this._setId(this.todos.length);
  }

  new(todo) {
    todo.id = this._getId() + 1;
    todo.removed = false;
    return todo;
  }

  save(todos) {
    this._setId(todos.length);
    localStorage[this.userName] = JSON.stringify(todos);
  }

  _setId(num) {
    this._id = num;
  }

  _getId() {
    return this._id;
  }
}
