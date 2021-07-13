export default class TodoItem {
  constructor(contents, id) {
    this.id = id;
    this.contents = contents;
    this.completed = false;
    this.editing = false;
  }
}
