export default class AddTodo {
  constructor($newTodoTitle, loadTodo) {
    this.loadTodo = loadTodo;
    $newTodoTitle.addEventListener("keyup", this.addTodo);
  }

  /** {target, key} 이 부분이 문법적인 약속이 있는 것 같은데 공부를 해봐야 한다. */
  addTodo = ({ target, key }) => {
    // console.log(target.value + " " + key);
    //space로만 이루어져있으면 안 되도록 하고 싶다.
    if (key === "Enter" && target.value) {
      this.todos = JSON.parse(localStorage.getItem("todos")) ?? [];
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = "";
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.loadTodo();
    }
  };
}
