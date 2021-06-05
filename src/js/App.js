import TodoInput from "./components/TodoInput.js";
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import FilterTodo from './components/FilterTodo.js';
import { FILTER } from "./CONST.js";

class NewTodoItem {
  constructor(text) {
    return {
      completed: false,
      text,
    }
  } 
}

class App {
  constructor(TodoList, TodoCount) {
    this.TodoList = TodoList;
    this.TodoCount = TodoCount;

    this.items = [];
    this.filteredItems = [];

    this.init();
  }

  init() {
    this.setState([]);
    this.setEvent();
  }

  get count() {
    return this.items.length
  }

  get filteredCount() {
    return this.filteredItems.length;
  }

  setFilteredState(updatedItems) {
    this.filteredItems = updatedItems;
    this.TodoList.setState(this.filteredItems);
    this.TodoCount.setState(this.filteredCount);
  }

  setState(updatedItems, isFiltered) {
    const mapItems = updatedItems.map((item, id) => ({ ...item, id }));
    if (isFiltered) {
      this.setFilteredState(mapItems);
      return;
    }

    this.items = mapItems;
    this.TodoList.setState(this.items);
    this.TodoCount.setState(this.count);
  }

  setEvent() {
    this.addTodo();
    this.updateTodo();
    this.filterTodo();
  }

  addTodo() {
    new TodoInput({
      add: text => {
        const newItem = new NewTodoItem(text);
        this.items.push(newItem);
        this.setState(this.items);
      }
    })
  }

  updateTodo() {
    this.TodoList.setEvent({
      update: (id, { key, value }) => {
        this.items[id][key] = value;
        this.setState(this.items);
      },
      delete: (id) => {
        this.items.splice(id, 1);
        this.setState(this.items);
      }
    })
  }

  filter = {
    [FILTER.ACTIVE]: () => this.setState(this.items.filter(item => !item.completed), true),
    [FILTER.COMPLETED]: () => this.setState(this.items.filter(item => item.completed), true),
    [FILTER.ALL]: () => this.setState(this.items, false),
  }

  filterTodo() {
    new FilterTodo({
      filterBy: (type) => this.filter[type] && this.filter[type]()
    })
  }
};

export default function() {
  return new App(new TodoList(), new TodoCount());
};