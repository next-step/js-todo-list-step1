export default function TodoInput({ onAdd }) {
  this.$todoInput = document.querySelector("#new-todo-title");

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && this.$todoInput.value.length > 0) {
      this.addTodoItem(this.$todoInput.value);
    }
  });

  this.addTodoItem = (value) => {
    console.log(value);
    onAdd(value);
    this.$todoInput.value = "";
  };

  this.isValid = (event, value) => {
    if (event.key === "Enter" && value !== "") {
      return true;
    }

    return false;
  };
}
