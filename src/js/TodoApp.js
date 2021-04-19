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
      this.todoItems.forEach((item) => {
        if (item.getId() == id) item.switchCompleted();
      });
      this.setState(this.todoItems);
    },
    onEditing: (id) => {
      this.todoItems.forEach((item) => {
        if (item.getId() == id) item.switchEditing();
      });
      this.setState(this.todoItems);
    },
    onEdit: (id, contents) => {
      this.todoItems.forEach((item) => {
        if (item.getId() == id) {
          item.switchEditing();
          item.setContents(contents);
        }
      });
      this.setState(this.todoItems);
    },
    onDelete: (id) => {
      const updatedItems = this.todoItems.filter((item) => {
        return item.getId() != id;
      });
      this.setState(updatedItems);
    },
  });

  const todoCount = new TodoCount({
    onFilter: (filter) => {
      const updatedItems = this.todoItems.filter((item) => {
        if (filter === 'all') return true;
        else if (filter === 'active') return item.getCompleted() == false;
        else if (filter === 'completed') return item.getCompleted() == true;
      });
      todoList.setState(updatedItems);
      todoCount.setState(updatedItems);
    },
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
    todoCount.setState(this.todoItems);
  };
}

export default TodoApp;
