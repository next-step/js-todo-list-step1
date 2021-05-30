import { $ } from "./utils/querySelector.js";
import { STATUS_TYPE } from "./utils/Constants.js";

import { TodoItem } from "../js/components/TodoItem.js";
import { TodoInput } from "../js/components/TodoInput.js";
import { TodoList } from "../js/components/TodoList.js";
import { TodoCheckBox } from "./components/TodoCheckBox.js";
import { TodoDelete } from "../js/components/TodoDelete.js";
import { TodoCount } from "../js/components/TodoCount.js";

function TodoApp() {
  this.todoItems = JSON.parse(localStorage.getItem("todos")) ?? [];
  let id = 0;

  new TodoInput({
    onAdd: (content) => {
      const newTodoItem = new TodoItem(id++, content, STATUS_TYPE.ACTIVE);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  new TodoCheckBox({
    onCheck: (checkedListId) => {
      const listId = parseInt(checkedListId);
      const updatedItems = this.todoItems.map((item) =>
        item.swapCheckStatus(listId)
      );
      this.setState(updatedItems);
    },
  });

  new TodoDelete({
    onDelete: (deleteTargetId) => {
      const targetId = parseInt(deleteTargetId);

      this.setState(
        this.todoItems.filter((todoItem) => todoItem.id !== targetId)
      );
    },
  });

  const todoList = new TodoList({
    onEditMode: (id) => {
      const updateItems = this.todoItems.map((item) => {
        if (item.id === parseInt(id) && item.isActive()) {
          return new TodoItem(item.id, item.content, "editing");
        }
        return item;
      });
      this.setState(updateItems);
    },

    onUpdate: (id, value) => {
      const updateItems = this.todoItems.map((item) => {
        if (item.id === parseInt(id) && item.isEditing()) {
          return new TodoItem(item.id, value, "active");
        }
        return item;
      });
      this.setState(updateItems);
    },
  });

  const todoCount = new TodoCount({
    onSelectedGroup: (selectedItems) => {
      todoList.setState(selectedItems);
    },
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    localStorage.setItem("todo-items", JSON.stringify(this.todoItems));
    todoCount.setState(this.todoItems);
    todoList.setState(this.todoItems);
  };

  this.getLocalTodo = () => {
    let local_todo = localStorage.getItem("todo-items");

    if (local_todo === null || JSON.parse(local_todo).length === 0) {
      this.todoItems = [];
    } else {
      local_todo = JSON.parse(local_todo);

      Object.values(local_todo).forEach((each) => {
        this.todoItems.push(
          new TodoItem(id++, each.content, STATUS_TYPE.ACTIVE)
        );
      });
    }
  };

  this.init = () => {
    todoCount.init();
    todoCount.setState(this.todoItems);
    todoList.setState(this.todoItems);
  };
}

const app = new TodoApp();
app.getLocalTodo();
app.init();
