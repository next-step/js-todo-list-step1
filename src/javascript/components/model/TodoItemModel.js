class TodoItemModel {
  constructor(contents, id) {
    this.contents = contents;
    this.id = id;
    this.completed = false;
    this.editing = false;
  }
}

export default TodoItemModel;
