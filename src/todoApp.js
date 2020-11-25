'use strict';

import TodoList from './todoList.js';
import TodoInput from './todoInput.js';
import TodoItem from './todoItem.js';

const todoList = new TodoList();

export default function TodoApp() {
  this.todoItems = [];

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };
    
  new TodoInput({
    onAdd: contents => {
      const newTodoItem = new TodoItem({ contents });
      this.setState([...this.todoItems, newTodoItem]);
      this.setState(this.todoItems);
    }
  });
}