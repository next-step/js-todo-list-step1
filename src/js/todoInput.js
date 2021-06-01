export default function TodoInput({ onAdd }) {
  this.$todoInput;
  this.render = () => {
    this.$todoInput = document.querySelector("#new-todo-title");
  };

  window.addEventListener("keydown", ({ key }) => {
    if (key === "Enter" && this.$todoInput.value.length > 0) {
      this.addTodoItem(this.$todoInput.value);
    }
  });

  this.addTodoItem = (value) => {
    console.log(value);
    onAdd(value);
    this.$todoInput.value = "";
  };

  this.isValidInput = (event, value) => {
    if (event.key === "Enter" && value !== "") {
      return true;
    }

    return false;
  };
}
