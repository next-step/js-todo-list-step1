export default class DB {
  constructor(userName) {
    // NOTE: todo 에는 id, completed여부, content 가 들어온다.
    this.userName = userName;
    const temp = localStorage[this.userName];
    this.todos = temp ? JSON.parse(temp) : new Array();
    this.setId(this.todos.length);
  }

  new(todo) {
    this.increaseId();
    todo.id = this.getId();
    todo.removed = false;
    return todo;
  }

  save(todos) {
    this.setId(todos.length);
    localStorage[this.userName] = JSON.stringify(todos);
  }

  setId(num) {
    this._id = num;
  }

  getId() {
    return this._id;
  }

  increaseId() {
    this._id++;
  }
}
