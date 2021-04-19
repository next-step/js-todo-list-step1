import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import TodoCount from './TodoCount.js';

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
        if (item.id == id) item.completed = !item.completed;
      });
      this.setState(this.todoItems);
    },
    onEditing: (id) => {
      this.todoItems.map((item) => {
        if (item.id == id) item.editing = !item.editing;
      });
      this.setState(this.todoItems);
    },
    onEdit: (id, contents) => {
      this.todoItems.map((item) => {
        if (item.id == id) {
          item.editing = !item.editing;
          item.contents = contents;
        }
      });
      this.setState(this.todoItems);
    },
  });

  const todoCount = new TodoCount({
    onFilter: (filter) => {
      this.setState(
        this.todoItems.filter((item) => {
          if (filter === 'all') return true;
          else if (filter === 'active') return item.completed == false;
          else if (filter === 'completed') return item.completed == true;
        })
      );
    },
  });

  this.setState = (updatedItems) => {
    // this.todoItems = updatedItems; // 이게 필요한가? 왜?
    // todoList.setState(this.todoItems);
    // todoCount.setState(this.todoItems);
    todoList.setState(updatedItems);
    todoCount.setState(updatedItems);
  };
}

export default TodoApp;
