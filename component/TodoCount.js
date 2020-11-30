export class TodoCount {
  constructor(todoItem) {
    this.$todoCountContainer = document.querySelector(".count-container");
    this.$todoCount = document.querySelector(".todo-count");
    this.setState(todoItem);
  }

  setState = (updateItems) => {
    this.render(updateItems);
  };

  render({ length }) {
    console.log(length);
    this.$todoCount.querySelector("strong").innerHTML = length;
  }
}
