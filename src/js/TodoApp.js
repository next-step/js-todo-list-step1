import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';

function TodoApp() {
  this.todoItems = [];

  const uniqueId = (function () {
    let id = 0;
    return function () {
      return id++;
    };
  })();

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents, uniqueId());
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  const todoList = new TodoList({
    onCheck: (id) => {
      this.todoItems.map((item) => {
        if (item.id == id) {
          item.completed = !item.completed;
        }
      });
      this.setState(this.todoItems);
    },
    // onEdit:,
    // onDelete:
  });

  // const todoCount = new TodoCount({});

  this.setState = (updatedItems) => {
    // console.log(this.todoItems);
    // console.log(updatedItems);
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };
}

export default TodoApp;
