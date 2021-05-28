import TodoItemModel from "./model/TodoItemModel.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";

function TodoApp() {
  let id = 0;
  this.todoItems = [];

  const countTarget = document.querySelector(".todo-count strong");
  const todoCount = new TodoCount(countTarget);

  const todoList = new TodoList({
    onDelete: (id) => {
      this.todoItems = this.todoItems.filter((item) => {
        return item.id != id;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
    },
    onComplete: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id == id) {
          item.completed = !item.completed;
        }
        return item;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
    },
    onEditing: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id == id) {
          item.editing = !item.editing;
        }
        return item;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
    },
    onEdit: (e, id) => {
      if (e.key === "Escape") {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id == id) {
            item.editing = !item.editing;
          }
          return item;
        });
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
      }
      if (e.key === "Enter") {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id == id) {
            item.contents = e.target.value;
            item.editing = false;
          }
          return item;
        });
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
      }
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
      todoCount.setState(this.todoItems);
    },
  });

  new TodoFilter({
    filtering: (clickedButton) => {
      if (clickedButton == "active") {
        const activeItems = this.todoItems.filter((item) => {
          return !item.completed;
        });
        todoList.setState(activeItems);
        todoCount.setState(activeItems);
        return;
      }
      if (clickedButton == "completed") {
        const completedItems = this.todoItems.filter((item) => {
          return item.completed;
        });
        todoList.setState(completedItems);
        todoCount.setState(completedItems);
        return;
      }
      if (clickedButton == "all") {
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
        return;
      }
    },
  });
}

export default TodoApp;
