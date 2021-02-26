export default class Item {
  id;
  title;
  isCompleted;

  constructor(id, title, isCompleted) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}
