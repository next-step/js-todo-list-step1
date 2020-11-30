export class TodoCount {
  constructor() {
    this.$todoCountContainer = document.querySelector(".count-container");
    this.$todoCount = document.querySelector(".todo-count");
  }

  countTodoItem() {}

  setState = (updateItems) => {
    this.render(updateItems);
  };

  render({ length }) {
    console.log(length);
    this.$todoCount.querySelector("strong").innerHTML = length;
  }
}
