export default class DB {
  constructor(userName) {
    // NOTE: todo 에는 id, completed여부, content 가 들어온다.
    this.userName = userName;
    const temp = localStorage[this.userName];
    console.log(temp);
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
    localStorage[this.userName] = JSON.stringify(todos);
  }

  // NOTE: 인자로 id 를 받는게 아니라 todo 자체를 받고 하는게 더 좋지 않을까?
  // NOTE: 여기서 에러가 발생하는 경우가 있을까? 굳이 async 를 사용하는게 좋은건가?
  remove(todos) {
    localStorage[this.userName] = todos;
  }

  increaseId() {
    this._id++;
  }

  setId(num) {
    this._id = num;
  }

  getId() {
    return this._id;
  }

  getTodos() {
    return this.todos.filter((todo) => !todo.removed);
  }
}
