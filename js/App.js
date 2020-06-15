import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default class App {
  constructor({ data, $targetTodoInput, $targetTodoList }) {
    this.data = data;

    this.todoInput = new TodoInput({
      data: this.data,
      $target: $targetTodoInput,
      onInput: (text) => {
        const todo = {
          id: this.data[this.data.length - 1].id + 1,
          text,
          isCompleted: false,
        };
        const nextData = [...this.data, todo];
        console.log(nextData);
        this.setState(nextData);
      },
    });

    this.todoList = new TodoList({
      data: this.data,
      $target: $targetTodoList,
      onRemove: (id) => {
        const nextData = this.data.filter((todo) => todo.id.toString() !== id);
        this.setState(nextData);
      },
    });
    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(this.data);
  }

  render() {
    this.todoList.setState(this.data);
  }
}
