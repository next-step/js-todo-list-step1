import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilters from "./TodoFilters.js";

export default class App {
  countId = 3;
  // filteredData = [];
  constructor({
    data,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCount,
    $targetTodoFilters,
  }) {
    this.data = data;
    // this.filteredData = this.filteredData;

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
        this.todoCount.setState(this.data)
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
        this.todoCount.setState(this.data)

      },
      onRemove: (id) => {
        const nextData = this.data.filter((todo) => todo.id.toString() !== id);
        this.setState(nextData);
        this.todoCount.setState(this.data)
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
        // this.filteredData = this.data.filter(
        //   (todo) => todo.isCompleted.toString() !== boolean
        // );
        // console.log(this.filteredData);
        // this.todoList.setState(this.filteredData);
        // this.todoCount.setState(this.filteredData);
        // this.render()
        this.todoList.setState(this.data)
        this.todoCount.setState(this.data);

      },
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(this.data);
    // this.todoFilters.setState(this.data)
  }

  render() {
    this.todoList.render(this.data);
    // this.todoList.setState(filteredData);
    // this.todoCount.setState(filteredData);
  }
}
