export class TodoCount {
  constructor(todoItem) {
    this.$todoCount = document.querySelector(".todo-count");
    this.setState(todoItem);
  }

  setState = (updateItems) => {
    this.render(updateItems);
  };

  render(items) {
    if(!items) return;
    this.$todoCount.querySelector("strong").innerHTML = items.length;
  }
}
