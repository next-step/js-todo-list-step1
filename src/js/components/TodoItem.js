export default function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
  this.editing = false;
}