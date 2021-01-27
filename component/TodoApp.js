import { TodoList } from "./TodoList.js";
import { TodoInput } from "./TodoInput.js";
import { TodoTotalCount } from "./TodoTotalCount.js";

export function TodoApp($div) {
  const $ul = $div.querySelector("#todo-list");

  this.todoItems = [];
  this.filter = "all";

  this.todoInput = new TodoInput(this);
  this.todoList = new TodoList($ul, this);
  this.todoTotalCount = new TodoTotalCount($div, this);

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.TodoList.setState(this.todoItems);
  };

  this.saveItem = (item) => {
    this.todoItems.push(item);
    this.filterTodo(this.filter);
  };

  this.complete = (todoItem) => {
    this.todoItems
      .filter((item) => item.todoItem === todoItem)
      .map((item) => (item.completed = !item.completed));

    this.filterTodo(this.filter);
  };

  this.delete = (todoItem) => {
    const index = this.todoItems.findIndex(
      (item) => item.todoItem === todoItem
    );
    this.todoItems.splice(index, 1);
    this.filterTodo(this.filter);
  };

  this.update = (id, todoItem) => {
    const index = this.todoItems.findIndex((item) => item.todoItem === id);
    this.todoItems[index].todoItem = todoItem;
    this.todoList.render(this.todoItems);
  };

  this.filterTodo = (completeStatus) => {
    this.filter = completeStatus;

    const status = {
      all: () => this.todoItems,
      active: () => this.todoItems.filter((item) => !item.completed),
      completed: () => this.todoItems.filter((item) => item.completed),
    };
    const filterTodoItems = status[this.filter]();

    this.todoList.render(filterTodoItems);
    this.todoTotalCount.setState(filterTodoItems, this.filter);
  };
}
