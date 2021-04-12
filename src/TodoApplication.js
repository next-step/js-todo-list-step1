import TodoCount from './components/TodoCount.js';
import TodoFilter, { FilterType } from './components/TodoFilter.js';
import TodoInput from './components/TodoInput.js';
import TodoItem from './components/TodoItem.js';
import TodoList from './components/TodoList.js';

export default class TodoApplication {
  constructor() {
    this.todoItems = [];
    this.filterType = FilterType.ALL;
    this.todoInput = new TodoInput({ onAdd: this.onAdd.bind(this) });
    this.todoList = new TodoList(this.todoItems, { onToggleTodoItem: this.onToggleTodoItem.bind(this) });
    this.todoCount = new TodoCount(this.todoItems.length);
    this.todoFilter = new TodoFilter(this.filterType, { onChange: this.onChangeFilter.bind(this) });
  }

  onAdd(content) {
    const todoItem = new TodoItem({ content });
    this.todoItems.push(todoItem);
    this.setState(this.todoItems, this.filterType);
  }

  onToggleTodoItem(id) {
    const updatedTodoItems = this.todoItems.map((todoItem) => {
      if (todoItem.equalsId(id)) {
        todoItem.toggleCompleted();
      }
      return todoItem;
    });
    this.todoItems = updatedTodoItems;
    this.setState(this.todoItems, this.filterType);
  }

  onChangeFilter(filterType) {
    this.filterType = filterType;
    this.setState(this.todoItems, this.filterType);
  }

  setState(todoItems, filterType) {
    const filteredTodoItems = filterType.filter(todoItems);
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
    this.todoFilter.setState(filterType);
  }
}
