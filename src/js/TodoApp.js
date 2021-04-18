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
    onClick: (id) => {
      this.todoItems.map((item) => {
        if (item.id == id) item.completed = !item.completed;
      });
      this.setState(this.todoItems);
    },
    onDblClick: (id) => {
      this.todoItems.map((item) => {
        if (item.id == id) item.editing = !item.editing;
      });
      this.setState(this.todoItems);
    },
    onKeyUp: (id, key, contents) => {
      // if (event.key === 'Escape') this.onDblClick(id);
      // 이렇게 쓰는 방법 없어?
      if (key === 'Escape') {
        this.todoItems.map((item) => {
          if (item.id == id) item.editing = !item.editing;
        });
        this.setState(this.todoItems);
      } else if (key === 'Enter') {
        this.todoItems.map((item) => {
          if (item.id == id) {
            item.editing = !item.editing;
            item.contents = contents;
          }
        });
        this.setState(this.todoItems);
      }
    },
  });

  // const todoCount = new TodoCount({});

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };
}

export default TodoApp;
