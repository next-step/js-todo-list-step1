export default function ChangeTodos(setState) {
  this.setState = setState;
  this.$todoList = document.querySelector("#todo-list");
  this.todoItems = [];

  this.changeStatus = ({ target }) => {
    console.log("hi");
    // this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
    // this.setState(this.todoItems);
    /* 이제 여기서 클래스를 변경해줘서 completed가 되도록 해줘야 한다. */
  };

  this.$todoList.addEventListener("click", this.changeStatus);
}
