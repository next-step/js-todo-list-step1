import { TodoList } from "./TodoList.js";
import { TodoInput } from "./TodoInput.js";
import { TodoTotalCount } from "./TodoTotalCount.js";
import { LocalStorageSupporter } from '../LocalStorageSupporter.js'

export function TodoApp($div) {
  const $ul = $div.querySelector("#todo-list");

  const storage = new LocalStorageSupporter('todoItem');
  this.todoItems = storage.get();
  this.filter = "all";

  this.todoInput = new TodoInput(this);
  this.todoList = new TodoList($ul, this);
  this.todoTotalCount = new TodoTotalCount($div, this);

  this.saveItem = (item) => { 
    storage.save(item);
    this.filterTodo(this.filter);
  };

  this.complete = (todoItem) => {
    storage.complete(todoItem);
    this.filterTodo(this.filter);
  };

  this.delete = (todoItem) => {
    storage.delete(todoItem);
    this.filterTodo(this.filter);
  };

  this.update = (id, todoItem) => {
    const updateItems = storage.update(id, todoItem);
    this.todoList.render(updateItems);
  };

  this.filterTodo = (completeStatus) => {
  
    this.filter = completeStatus;
    const status = {
      all: () => storage.get(),
      active: () => storage.get().filter((item) => !item.completed),
      completed: () =>  storage.get().filter((item) => item.completed),
    };
    const filterTodoItems = status[this.filter]();

    this.todoList.render(filterTodoItems);
    this.todoTotalCount.setState(filterTodoItems, this.filter);
  };


  this.render = () =>{
    this.todoList.setState(storage.get());
  }
}
