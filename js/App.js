import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default class App {
  countId = 3;
  constructor({ data, $targetTodoInput, $targetTodoList }) {
    this.data = data;

    this.todoInput = new TodoInput({
      data: this.data,
      $target: $targetTodoInput,
      onInput: (text) => {
        const todo = {
          id: this.countId++,
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
      onToggle: (id) => {
        const todo = this.data.filter((todo) => todo.id.toString() === id)[0];
        const { isCompleted } = todo;
        todo.isCompleted = !isCompleted;
        const restData = this.data.filter((todo) => todo.id.toString() !== id);
        const nextData = [...restData, todo].sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 1;
        });
        this.setState(nextData);
      },
      onRemove: (id) => {
        const nextData = this.data.filter((todo) => todo.id.toString() !== id);
        this.setState(nextData);
      },
      onEdit: (id, text) => {
        const todo = this.data.filter((todo) => todo.id.toString() === id)[0];
        todo.text = text;
        const restData = this.data.filter((todo) => todo.id.toString() !== id);
        const nextData = [...restData, todo].sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 1;
        });
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
