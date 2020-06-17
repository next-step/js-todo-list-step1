import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilters from './TodoFilters.js';

export default class App {
  constructor({
    data,
    countId,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCount,
    $targetTodoFilters,
    $targetTodoToggleAll,
  }) {
    this.data = data;
    this.countId = countId;

    this.todoInput = new TodoInput({
      data: this.data,
      $target: $targetTodoInput,
      $targetTodoFilters,
      onInput: (text) => {
        const todo = {
          id: this.countId++,
          text,
          isCompleted: false,
        };
        const nextData = [...this.data, todo];
        this.setState(nextData);
      },
    });

    this.todoList = new TodoList({
      data: this.data,
      filteredData: [],
      $target: $targetTodoList,
      $targetTodoFilters,
      $targetTodoToggleAll,
      onToggle: (id) => {
        const index = this.data.findIndex((todo) => todo.id.toString() === id);
        let nextData = [...this.data];
        nextData[index].isCompleted = !this.data[index].isCompleted;
        this.setState(nextData);
      },
      onToggleAll: (boolean) => {
        const toggleData = this.data.map((val) => {
          return {
            ...val,
            isCompleted: (val.isCompleted = boolean),
          };
        });
        this.setState(toggleData);
      },
      onRemove: (id) => {
        const nextData = this.data.filter((todo) => todo.id.toString() !== id);
        this.setState(nextData);
      },
      onEdit: (id, text) => {
        const index = this.data.findIndex((todo) => todo.id.toString() === id);
        let nextData = [...this.data];
        nextData[index].text = text;
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
      onClickFilter: (className) => {
        if (className === 'destroy-all') {
          this.data = [];
        }
        this.setState(this.data);
      },
    });
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.todoList.setState(this.data);
    this.todoCount.setState(this.data);
    localStorage.setItem('myTodo', JSON.stringify(this.data));
  }

  render() {
    this.todoList.render(this.data);
  }
}
