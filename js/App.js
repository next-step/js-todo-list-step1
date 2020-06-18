import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilters from './TodoFilters.js';
import { FILTERNAME } from './utils/constants.js';

export default class App {
  constructor({
    data,
    countId,
    filterType,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCount,
    $targetTodoFilters,
    $targetTodoToggleAll,
  }) {
    this.data = data;
    this.countId = countId;
    this.filterType = filterType;

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
        this.setState(nextData, FILTERNAME.ALL);
      },
    });

    this.todoList = new TodoList({
      data: this.data,
      filteredData: [],
      filterType: this.filterType,
      $target: $targetTodoList,
      $targetTodoFilters,
      $targetTodoToggleAll,
      onToggle: (id) => {
        const index = this.data.findIndex((todo) => todo.id.toString() === id);
        let nextData = [...this.data];
        nextData[index].isCompleted = !this.data[index].isCompleted;
        this.setState(nextData, this.filterType);
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
        this.setState(nextData, this.filterType);
      },
      onEdit: (id, text) => {
        const index = this.data.findIndex((todo) => todo.id.toString() === id);
        let nextData = [...this.data];
        nextData[index].text = text;
        this.setState(nextData, this.filterType);
      },
    });

    this.todoCount = new TodoCount({
      data: this.data,
      filterType: this.filterType,
      $target: $targetTodoCount,
      $targetTodoFilters,
    });

    this.todoFilters = new TodoFilters({
      data: this.data,
      filterType: this.filterType,
      $target: $targetTodoFilters,
      $targetTodoList,
      onClickFilter: (className) => {
        if (className === 'destroy-all') {
          this.data = [];
        } else {
          this.filterType = className
        }
        this.setState(this.data, this.filterType);
      },
    });
    this.render();
  }

  setState(nextData, nextFilterType) {
    this.data = nextData;
    this.filterType = nextFilterType;
    this.todoList.setState(this.data, this.filterType);
    this.todoCount.setState(this.data, this.filterType);
    localStorage.setItem('myTodo', JSON.stringify(this.data));
  }

  render() {
    this.todoList.render(this.data);
  }
}
