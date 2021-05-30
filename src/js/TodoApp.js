import { $ } from "./utils/querySelector.js";
import { STATUS_TYPE } from "./utils/Constants.js";

import { TodoItem } from "../js/components/TodoItem.js";
import { TodoInput } from "../js/components/TodoInput.js";
import { TodoList } from "../js/components/TodoList.js";
import { TodoCheckBox } from "./components/TodoCheckBox.js";
import { TodoDelete } from "../js/components/TodoDelete.js";
import { TodoCount } from "../js/components/TodoCount.js";

function TodoApp() {
  this.todoItems = [];

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
      this.setState(updatedItems); // 전체를 한번에 업데이트
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
    todoCount.setState(this.todoItems);
    todoList.setState(this.todoItems);
  };

  this.init = () => {
    todoCount.init();
    todoCount.setState(this.todoItems);
    todoList.setState(this.todoItems);
  };
}

const app = new TodoApp();
app.init();
