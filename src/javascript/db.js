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

  // NOTE: 인자로 id 를 받는게 아니라 item 자체를 받고 하는게 더 좋지 않을까?
  // NOTE: 여기서 에러가 발생하는 경우가 있을까? 굳이 async 를 사용하는게 좋은건가?
  remove(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
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
