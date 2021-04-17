function TodoItem(contents, id) {
  this.contents = contents;
  this.id = id;
  // this.completed = 'false';
  this.completed = false;
  this.editing = false;
}

export default TodoItem;
