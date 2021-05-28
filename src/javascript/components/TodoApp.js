import TodoItemModel from "./model/TodoItemModel.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";

function TodoApp() {
  let id = 0;
  this.todoItems = [];

  const todoList = new TodoList({
    onDelete: (id) => {
      this.todoItems = this.todoItems.filter((item) => {
        return item.id != id;
      });
      todoList.setState(this.todoItems);
    },
    onComplete: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id == id) {
          item.completed = !item.completed;
        }
        return item;
      });
      todoList.setState(this.todoItems);
    },
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItemModel(contents, id++);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      todoList.setState(this.todoItems);
    },
  });
}

export default TodoApp;
