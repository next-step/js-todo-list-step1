import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilters from "./TodoFilters.js";

export default class App {
  countId = 3;
  constructor({
    data,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCount,
    $targetTodoFilters,
  }) {
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
        this.setState(nextData);
        this.todoCount.setState(this.data);
      },
    });

    this.todoList = new TodoList({
      data: this.data,
      $target: $targetTodoList,
      $targetTodoFilters,
      onToggle: (id) => {
        const todo = this.data.filter((todo) => todo.id.toString() === id)[0];
        const { isCompleted } = todo;
        todo.isCompleted = !isCompleted;
        const restData = this.data.filter((todo) => todo.id.toString() !== id);
        const nextData = [...restData, todo].sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 1;
        });
        this.setState(nextData);
        this.todoCount.setState(this.data);
      },
      onRemove: (id) => {
        const nextData = this.data.filter((todo) => todo.id.toString() !== id);
        this.setState(nextData);
        this.todoCount.setState(this.data);
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

    this.todoCount = new TodoCount({
      data: this.data,
      $target: $targetTodoCount,
      $targetTodoFilters,
    });

    this.todoFilters = new TodoFilters({
      data: this.data,
      $target: $targetTodoFilters,
      $targetTodoList,
      onClickFilter: (boolean) => {
        this.todoList.setState(this.data);
        this.todoCount.setState(this.data);
      },
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(this.data);
    localStorage.setItem('myTodo', JSON.stringify(this.data))
  }

  render() {
    this.todoList.render(this.data);
  }
}
