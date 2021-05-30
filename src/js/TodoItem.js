function TodoItem(contents) {
  this.id = Date.now();
  this.contents = contents;
  this.complete = false;
}

export default TodoItem;
