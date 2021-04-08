export default class DB {
  constructor(userName) {
    // NOTE: todo 에는 id, completed여부, content 가 들어온다.
    this.userName = userName;
    const temp = localStorage[this.userName];
    this.todos = temp ? JSON.parse(temp) : new Array();
    this.setId(this.todos.length);
    // NOTE: count 작성하기
    // this.count = this.todos.length;
    // console.log(`${this.userName}'s count: ${this.count}`);
  }

  save(todo) {
    this.increaseId();
    todo.id = this.getId();
    this.todos.push(todo);
    todo.removed = false;
    localStorage[this.userName] = JSON.stringify(this.todos);
    return todo;
  }

  updateStatus(id) {
    // TODO: getItem 메서드 만들기
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }
    todo.completed = todo.completed ? false : true;
    localStorage[this.userName] = JSON.stringify(this.todos);
    return todo;
  }

  updateContent(id, content) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (content.length === 0) {
      throw todo;
    }
    if (!todo) {
      return;
    }
    todo.content = content;
    localStorage[this.userName] = JSON.stringify(this.todos);
    return todo;
  }

  // NOTE: 인자로 id 를 받는게 아니라 todo 자체를 받고 하는게 더 좋지 않을까?
  // NOTE: 여기서 에러가 발생하는 경우가 있을까? 굳이 async 를 사용하는게 좋은건가?
  remove(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }
    todo.removed = true;
    localStorage[this.userName] = JSON.stringify(this.todos);
    return todo;
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
