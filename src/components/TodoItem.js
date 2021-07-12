export default function TodoItem(value) {
  this.content = value;
  this.id = String(Date.now());
  this.completed = false;
}