import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilters from './TodoFilters.js';
import { sortData } from './utils/Funcs.js';

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
        const todo = this.data.filter((todo) => todo.id.toString() === id)[0];
        const { isCompleted } = todo;
        todo.isCompleted = !isCompleted;
        const nextData = sortData(todo, this.data, id);
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
        const todo = this.data.filter((todo) => todo.id.toString() === id)[0];
        todo.text = text;
        const nextData = sortData(todo, this.data, id);
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
