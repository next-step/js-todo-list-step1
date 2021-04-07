export default class DB {
  constructor(userName) {
    // NOTE: todo 에는 id, completed여부, content 가 들어온다.
    this._id = 0;
    this.userName = userName;
    const temp = localStorage[this.userName];
    this.todos = temp ? JSON.parse(temp) : new Array();
    // NOTE: count 작성하기
    // this.count = this.todos.length;
    // console.log(`${this.userName}'s count: ${this.count}`);
  }

  save(item) {
    this.increaseId();
    item.id = this.getId();
    this.todos.push(item);
    localStorage[this.userName] = JSON.stringify(this.todos);
    return item;
  }

  increaseId() {
    this._id++;
  }

  getId() {
    return this._id;
  }

  getTodos() {
    return this.todos;
  }
}
