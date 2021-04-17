export class TodoItem {
  static ACTIVE = "active";
  static COMPLETED = "completed";

  constructor(data, state) {
    if (state != TodoItem.ACTIVE && state != TodoItem.COMPLETED) {
      alert("item state error");
      return;
    }
    this.data = data;
    this.state = state;
  }
  toString() {
    return JSON.stringify(this);
  }
}
